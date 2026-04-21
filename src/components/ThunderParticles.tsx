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
  morph: boolean;
}

function ParticleSystem({ count, morph }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { size } = useThree();

  // Mouse in NDC for subtle attraction
  const ndc = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ndc.current.x = (e.clientX / size.width) * 2 - 1;
      ndc.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [size]);

  // Geometry buffers
  const { positions, basePositions, targetPositions, drift } = useMemo(() => {
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
    return { positions, basePositions: base, targetPositions: target, drift };
  }, [count]);

  // Per-particle color — deep, saturated tones that pop on a light background
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#6d28d9'), // deep violet
      new THREE.Color('#2563eb'), // electric blue
      new THREE.Color('#db2777'), // magenta
      new THREE.Color('#0891b2'), // dark cyan
      new THREE.Color('#7c3aed'), // purple
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

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

    // Ease morph progress
    const target = morph ? 1 : 0;
    morphProgress.current += (target - morphProgress.current) * Math.min(1, dt * 3);
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

    const geom = pointsRef.current.geometry as THREE.BufferGeometry;
    (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // Material opacity boost during morph
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.85 + mp * 0.15;
    mat.size = 0.16 + mp * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
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
  const [morph, setMorph] = useState(false);
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
      onMouseEnter={() => setMorph(true)}
      onMouseLeave={() => setMorph(false)}
      onTouchStart={() => setMorph(true)}
      onTouchEnd={() => setMorph(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem count={count} morph={morph} />
      </Canvas>
    </div>
  );
}
