import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 500 }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      if (t < 0.5) {
        cols[i * 3] = 0.2; cols[i * 3 + 1] = 0.5; cols[i * 3 + 2] = 1.0;
      } else {
        cols[i * 3] = 0.5; cols[i * 3 + 1] = 0.2; cols[i * 3 + 2] = 1.0;
      }
    }
    return cols;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const geo = mesh.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    
    const mx = (state.pointer.x * viewport.width) / 2;
    const my = (state.pointer.y * viewport.height) / 2;
    mouse.current = { x: mx, y: my };

    for (let i = 0; i < count; i++) {
      posArr[i * 3] += velocities[i * 3];
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      posArr[i * 3 + 2] += velocities[i * 3 + 2];

      // Mouse repulsion
      const dx = posArr[i * 3] - mx;
      const dy = posArr[i * 3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        posArr[i * 3] += dx * 0.01;
        posArr[i * 3 + 1] += dy * 0.01;
      }

      // Bounds
      if (Math.abs(posArr[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(posArr[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArr[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }
    geo.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.0003;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function FloatingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={ref} position={[3, 0, -2]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial color="#3b82ff" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export default function ParticleField({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#3b82ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#8b5cf6" />
        <Particles />
        <FloatingSphere />
      </Canvas>
    </div>
  );
}
