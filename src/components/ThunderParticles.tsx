import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Lightning bolt outline as normalized coordinates (-1..1 range, will be scaled).
 * Classic zig-zag thunder shape.
 */
const BOLT_POINTS: [number, number][] = [
  [0.15, 1.0],
  [-0.35, 0.15],
  [-0.05, 0.15],
  [-0.45, -1.0],
  [0.45, -0.05],
  [0.05, -0.05],
  [0.45, 0.85],
  [0.15, 1.0],
];

/** Sample points along the closed polyline of the bolt. */
function sampleBoltPoints(count: number, scale: number): Float32Array {
  const segLengths: number[] = [];
  let total = 0;
  for (let i = 0; i < BOLT_POINTS.length - 1; i++) {
    const [ax, ay] = BOLT_POINTS[i];
    const [bx, by] = BOLT_POINTS[i + 1];
    const len = Math.hypot(bx - ax, by - ay);
    segLengths.push(len);
    total += len;
  }

  const arr = new Float32Array(count * 3);
  // ~60% along the outline, ~40% filling interior bands for body
  const outlineCount = Math.floor(count * 0.65);
  const fillCount = count - outlineCount;

  for (let i = 0; i < outlineCount; i++) {
    let dist = (i / outlineCount) * total;
    let seg = 0;
    while (seg < segLengths.length && dist > segLengths[seg]) {
      dist -= segLengths[seg];
      seg++;
    }
    const [ax, ay] = BOLT_POINTS[seg];
    const [bx, by] = BOLT_POINTS[seg + 1];
    const t = segLengths[seg] === 0 ? 0 : dist / segLengths[seg];
    // small jitter to avoid a too-clean line
    const jx = (Math.random() - 0.5) * 0.04;
    const jy = (Math.random() - 0.5) * 0.04;
    arr[i * 3] = (ax + (bx - ax) * t + jx) * scale;
    arr[i * 3 + 1] = (ay + (by - ay) * t + jy) * scale;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
  }

  // Fill: random points, kept only if inside bolt polygon (rejection sampling)
  const poly = BOLT_POINTS;
  const isInside = (x: number, y: number) => {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i];
      const [xj, yj] = poly[j];
      const intersect = ((yi > y) !== (yj > y)) &&
        (x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-9) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  let placed = 0;
  let safety = 0;
  while (placed < fillCount && safety < fillCount * 30) {
    safety++;
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    if (isInside(x, y)) {
      const idx = (outlineCount + placed) * 3;
      arr[idx] = x * scale;
      arr[idx + 1] = y * scale;
      arr[idx + 2] = (Math.random() - 0.5) * 0.4;
      placed++;
    }
  }
  // If rejection couldn't fill, snap remaining to outline
  while (placed < fillCount) {
    const [ax, ay] = BOLT_POINTS[placed % (BOLT_POINTS.length - 1)];
    const idx = (outlineCount + placed) * 3;
    arr[idx] = ax * scale;
    arr[idx + 1] = ay * scale;
    arr[idx + 2] = 0;
    placed++;
  }

  return arr;
}

interface ParticleSystemProps {
  count: number;
}

function ParticleSystem({ count }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera, gl } = useThree();

  // Mouse in NDC + world-space position for proximity detection
  const ndc = useRef({ x: 0, y: 0 });
  const worldMouse = useRef(new THREE.Vector3(0, 0, 0));
  const autoMorph = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;

    const onMove = (e: MouseEvent) => {
      // Get canvas bounds — accounts for scroll position and canvas placement
      const rect = canvas.getBoundingClientRect();

      // Mouse position relative to the canvas (not the viewport)
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      // Convert to NDC (-1 to +1) relative to canvas
      ndc.current.x = (relX / rect.width) * 2 - 1;
      ndc.current.y = -(relY / rect.height) * 2 + 1;

      // Check if mouse is actually over the canvas
      const isOverCanvas =
        relX >= 0 && relX <= rect.width &&
        relY >= 0 && relY <= rect.height;

      if (!isOverCanvas) {
        autoMorph.current = false;
        return;
      }

      // Unproject to world z=0 plane
      const v = new THREE.Vector3(ndc.current.x, ndc.current.y, 0.5);
      v.unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const d = -camera.position.z / dir.z;
      worldMouse.current.copy(camera.position.clone().add(dir.multiplyScalar(d)));

      // Morph only when mouse is near the bolt center (radius ~3.5 matches bolt scale)
      const dist = Math.sqrt(worldMouse.current.x ** 2 + worldMouse.current.y ** 2);
      autoMorph.current = dist < 3.5;
    };

    const onLeave = () => {
      autoMorph.current = false;
    };

    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [camera, gl]);

  // Geometry buffers
  const { geometry, positions, basePositions, targetPositions, drift } = useMemo(() => {
    const base = new Float32Array(count * 3);
    const drift = new Float32Array(count * 4); // speedX, speedY, ampX, ampY
    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() - 0.5) * 18;
      base[i * 3 + 1] = (Math.random() - 0.5) * 9;
      base[i * 3 + 2] = (Math.random() - 0.5) * 4;
      drift[i * 4] = 0.2 + Math.random() * 0.5;
      drift[i * 4 + 1] = 0.15 + Math.random() * 0.4;
      drift[i * 4 + 2] = 0.15 + Math.random() * 0.35;
      drift[i * 4 + 3] = 0.1 + Math.random() * 0.3;
    }
    const target = sampleBoltPoints(count, 3.2);
    const positions = new Float32Array(base); // current live positions

    // Per-particle color — deep, saturated tones that pop on a light background
    const colorArr = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#6d28d9'), // deep violet
      new THREE.Color('#2563eb'), // electric blue
      new THREE.Color('#db2777'), // magenta
      new THREE.Color('#0891b2'), // dark cyan
      new THREE.Color('#7c3aed'), // purple
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      colorArr[i * 3] = c.r;
      colorArr[i * 3 + 1] = c.g;
      colorArr[i * 3 + 2] = c.b;
    }

    // Build geometry imperatively to avoid React re-creating buffer attributes
    const geometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', posAttr);
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));

    return { geometry, positions, basePositions: base, targetPositions: target, drift };
  }, [count]);

  // Dispose old geometry when count changes or component unmounts
  useEffect(() => {
    return () => { geometry.dispose(); };
  }, [geometry]);

  // Soft circular sprite for glow
  const sprite = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Track morph progression with easing
  const morphProgress = useRef(0);
  const pulse = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // Ease morph progress — driven by proximity, not hover
    const morphTarget = autoMorph.current ? 1 : 0;
    morphProgress.current += (morphTarget - morphProgress.current) * Math.min(1, dt * 3);
    const mp = morphProgress.current;

    // Pulse only when (mostly) formed
    pulse.current = mp > 0.85 ? Math.sin(t * 4) * 0.04 + 1 : 1;
    const pulseScale = pulse.current;

    const pos = positions;
    const base = basePositions;
    const tgt = targetPositions;
    const drf = drift;
    const mx = ndc.current.x * 6;
    const my = ndc.current.y * 3.5;
    const jitter = mp > 0.9 ? 0.025 : 0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      // Free-floating drift target
      const driftX = base[i3] + Math.sin(t * drf[i4] + i) * drf[i4 + 2];
      const driftY = base[i3 + 1] + Math.cos(t * drf[i4 + 1] + i * 0.7) * drf[i4 + 3];

      // Subtle attraction toward mouse when not morphing
      let attractX = 0, attractY = 0;
      if (mp < 0.5) {
        const dx = mx - pos[i3];
        const dy = my - pos[i3 + 1];
        const d2 = dx * dx + dy * dy;
        if (d2 < 9) {
          const f = (1 - d2 / 9) * 0.15;
          attractX = dx * f;
          attractY = dy * f;
        }
      }

      const restX = driftX + attractX;
      const restY = driftY + attractY;
      const restZ = base[i3 + 2];

      const targetX = tgt[i3] * pulseScale + (Math.random() - 0.5) * jitter;
      const targetY = tgt[i3 + 1] * pulseScale + (Math.random() - 0.5) * jitter;
      const targetZ = tgt[i3 + 2];

      const finalX = restX + (targetX - restX) * mp;
      const finalY = restY + (targetY - restY) * mp;
      const finalZ = restZ + (targetZ - restZ) * mp;

      // Smooth toward final
      pos[i3] += (finalX - pos[i3]) * Math.min(1, dt * 6);
      pos[i3 + 1] += (finalY - pos[i3 + 1]) * Math.min(1, dt * 6);
      pos[i3 + 2] += (finalZ - pos[i3 + 2]) * Math.min(1, dt * 6);
    }

    (geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // Material opacity boost during morph
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.85 + mp * 0.15;
    mat.size = 0.16 + mp * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.18}
        map={sprite}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.NormalBlending}
        sizeAttenuation
      />
    </points>
  );
}

interface ThunderParticlesProps {
  className?: string;
}

export default function ThunderParticles({ className = '' }: ThunderParticlesProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1500);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(600);
      else if (w < 1024) setCount(1000);
      else setCount(1800);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem count={count} />
      </Canvas>
    </div>
  );
}
