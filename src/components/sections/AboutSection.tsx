import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
  const textRef = useRef<HTMLParagraphElement>(null);
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

    if (textRef.current) {
      const split = new SplitType(textRef.current, { types: 'lines' });
      if (split.lines) {
        gsap.set(split.lines, { opacity: 0, y: 20 });
        gsap.to(split.lines, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 85%' },
        });
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 ref={headingRef} className="font-heading text-4xl md:text-5xl font-bold mb-8 gradient-text">
            Who We Are
          </h2>
          <p ref={textRef} className="text-muted-foreground text-lg leading-relaxed">
            We are a collective of visionary technologists, designers, and innovators united by a singular purpose — 
            to craft solutions that transcend conventional boundaries. Silent Thunder Squad operates at the intersection 
            of cutting-edge technology and human-centered design, delivering experiences that resonate and endure. 
            Our approach combines deep technical expertise with creative audacity to solve the world's most pressing challenges.
          </p>
        </div>
        <div className="h-80 md:h-96">
          <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.4} />
            <pointLight position={[3, 3, 3]} intensity={0.6} color="#3b82ff" />
            <pointLight position={[-3, -3, 3]} intensity={0.3} color="#8b5cf6" />
            <RotatingTorus />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
