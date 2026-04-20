import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Antigravity-style scattered dashes with 3D parallax tilt
 * and continuous waving/floating motion.
 */
function AntigravityDashes({ count = 800 }) {
  const group = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera, size } = useThree();

  const ndcMouse = useRef({ x: 0, y: 0 });
  const smoothNdc = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ndcMouse.current.x = (e.clientX / size.width) * 2 - 1;
      ndcMouse.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [size]);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 30,
        z: (Math.random() - 0.5) * 20,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
        scale: 0.6 + Math.random() * 1.0,
        colorIdx: Math.floor(Math.random() * 4),
        // Continuous waving motion — unique per particle
        waveSpeedX: 0.3 + Math.random() * 0.6,
        waveSpeedY: 0.2 + Math.random() * 0.5,
        waveAmpX: 0.3 + Math.random() * 0.8,
        waveAmpY: 0.2 + Math.random() * 0.6,
        waveOffset: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, [count]);

  const dashGeo = useMemo(() => new THREE.PlaneGeometry(0.5, 0.08), []);

  const colors = useMemo(() => [
    new THREE.Color('#3b82f6'),
    new THREE.Color('#ef4444'),
    new THREE.Color('#8b5cf6'),
    new THREE.Color('#f97316'),
  ], []);

  const dashMat = useMemo(() => new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      meshRef.current.setColorAt(i, colors[particles[i].colorIdx]);
    }
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [count, colors, particles]);

  useFrame((state) => {
    if (!meshRef.current || !group.current) return;
    const t = state.clock.elapsedTime;

    smoothNdc.current.x += (ndcMouse.current.x - smoothNdc.current.x) * 0.05;
    smoothNdc.current.y += (ndcMouse.current.y - smoothNdc.current.y) * 0.05;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const angle = p.rotation + t * p.rotSpeed;

      // Continuous floating/waving motion
      const wx = Math.sin(t * p.waveSpeedX + p.waveOffset) * p.waveAmpX;
      const wy = Math.cos(t * p.waveSpeedY + p.waveOffset) * p.waveAmpY;

      dummy.position.set(p.x + wx, p.y + wy, p.z);
      dummy.rotation.set(0, 0, angle);
      dummy.scale.set(p.scale, p.scale, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // 3D parallax tilt
    group.current.rotation.y = smoothNdc.current.x * 0.3;
    group.current.rotation.x = -smoothNdc.current.y * 0.2;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={meshRef} args={[dashGeo, dashMat, count]} />
    </group>
  );
}

export default function ParticleField({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        <AntigravityDashes />
      </Canvas>
    </div>
  );
}
