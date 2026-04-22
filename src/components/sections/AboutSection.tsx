import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollParagraph, ScrollCounter } from '../StorytellingTypography';
import { AmbientDots } from '../StorytellingElements';

gsap.registerPlugin(ScrollTrigger);

/** Core crystal that rotates toward the mouse and breathes. */
function MouseTrackedCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    // Smooth rotation toward mouse
    targetRot.current.y = mouse.x * 0.8;
    targetRot.current.x = -mouse.y * 0.6;
    meshRef.current.rotation.x += (targetRot.current.x - meshRef.current.rotation.x) * 0.06;
    meshRef.current.rotation.y += (targetRot.current.y - meshRef.current.rotation.y) * 0.06;
    // Idle spin + breathing scale
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
    meshRef.current.scale.setScalar(s);

    if (glowRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation);
      glowRef.current.scale.setScalar(s * 1.15);
    }
  });

  return (
    <group>
      {/* Outer wireframe glow */}
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Inner solid crystal */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#2563eb"
          metalness={0.7}
          roughness={0.15}
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          flatShading
        />
      </mesh>
    </group>
  );
}

/** Particles that orbit the crystal and drift toward the cursor. */
function OrbitingParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const { geometry, speeds, radii, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const radii = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      radii[i] = 1.8 + Math.random() * 1.2;
      speeds[i] = 0.2 + Math.random() * 0.5;
      offsets[i] = Math.random() * Math.PI * 2;
      positions[i * 3] = 0;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = 0;
    }
    const geometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', posAttr);
    return { geometry, speeds, radii, offsets };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const angle = offsets[i] + t * speeds[i];
      arr[i * 3] = Math.cos(angle) * radii[i] + mouse.x * 0.4;
      arr[i * 3 + 1] = Math.sin(angle * 0.7) * radii[i] * 0.5 + mouse.y * 0.3;
      arr[i * 3 + 2] = Math.sin(angle) * radii[i];
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.06} color="#22d3ee" transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function AboutSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const splits: SplitType[] = [];

    if (headingRef.current) {
      const el = headingRef.current.querySelector('h2');
      if (el) {
        const split = new SplitType(el, { types: 'chars' });
        splits.push(split);
        if (split.chars) {
          gsap.set(split.chars, { opacity: 0, y: 40 });
          gsap.to(split.chars, {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%' },
          });
        }
      }
    }

    return () => { splits.forEach(s => s.revert()); };
  }, []);

  return (
    <section id="about" aria-label="About Silent Thunder Squad" className="relative py-32 px-6">
      <AmbientDots />
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef}>
          <h2 className="font-heading text-5xl md:text-7xl font-bold mb-24 gradient-text text-center">
            Who We Are
          </h2>
        </div>
        <p className="sr-only">Silent Thunder Squad is a student-led developer team in India specializing in affordable web development, full-stack solutions, and modern UI/UX design for startups and small businesses.</p>

        <div className="mb-24">
          <ScrollParagraph
            text="We are a collective of visionary technologists, designers, and innovators united by a singular purpose — to craft solutions that transcend conventional boundaries."
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          <ScrollCounter value={3} label="Projects Done" suffix="+" />
          <ScrollCounter value={6} label="Team Members" />
          <ScrollCounter value={12} label="Technologies" suffix="+" />
          <ScrollCounter value={99} label="Our Satisfaction" suffix="%" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="h-80 sm:h-96 md:h-[28rem] order-2 md:order-1 cursor-crosshair">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.5} />
              <pointLight position={[4, 4, 4]} intensity={1.2} color="#2563eb" />
              <pointLight position={[-4, -2, 3]} intensity={0.8} color="#7c3aed" />
              <pointLight position={[0, 0, 5]} intensity={0.6} color="#22d3ee" />
              <MouseTrackedCrystal />
              <OrbitingParticles count={90} />
            </Canvas>
          </div>
          <div className="order-1 md:order-2 w-full">
            <ScrollParagraph
              align="left"
              text="Silent Thunder Squad operates at the intersection of cutting-edge technology and human-centered design, delivering experiences that resonate and endure."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
