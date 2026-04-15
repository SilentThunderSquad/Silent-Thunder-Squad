import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollParagraph, ScrollCounter } from '../StorytellingTypography';
import { AmbientDots } from '../StorytellingElements';

gsap.registerPlugin(ScrollTrigger);

function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#3b82ff" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

export default function AboutSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const split = new SplitType(headingRef.current, { types: 'chars' });
      if (split.chars) {
        gsap.set(split.chars, { opacity: 0, y: 40 });
        gsap.to(split.chars, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        });
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <AmbientDots />
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="font-heading text-4xl md:text-5xl font-bold mb-20 gradient-text text-center">
          Who We Are
        </h2>

        {/* Narrative scroll paragraph — each word reveals with blur */}
        <div className="mb-24">
          <ScrollParagraph
            text="We are a collective of visionary technologists, designers, and innovators united by a singular purpose — to craft solutions that transcend conventional boundaries."
          />
        </div>

        {/* Stats counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          <ScrollCounter value={50} label="Projects Shipped" suffix="+" />
          <ScrollCounter value={6} label="Team Members" />
          <ScrollCounter value={12} label="Technologies" suffix="+" />
          <ScrollCounter value={99} label="Client Satisfaction" suffix="%" />
        </div>

        {/* 3D visual + supporting text */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="h-80 md:h-96 order-2 md:order-1">
            <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.4} />
              <pointLight position={[3, 3, 3]} intensity={0.6} color="#3b82ff" />
              <pointLight position={[-3, -3, 3]} intensity={0.3} color="#8b5cf6" />
              <RotatingTorus />
            </Canvas>
          </div>
          <div className="order-1 md:order-2">
            <ScrollParagraph
              text="Silent Thunder Squad operates at the intersection of cutting-edge technology and human-centered design, delivering experiences that resonate and endure."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
