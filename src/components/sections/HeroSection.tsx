import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import ParticleField from '../ParticleField';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 });

    if (logoRef.current) {
      tl.fromTo(logoRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' });
    }

    if (titleRef.current) {
      const split = new SplitType(titleRef.current, { types: 'chars' });
      if (split.chars) {
        gsap.set(split.chars, { opacity: 0, y: 50, rotateX: -40 });
        tl.to(split.chars, {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.7, stagger: 0.03, ease: 'power3.out',
        }, '-=0.3');
      }
    }

    if (subtitleRef.current) {
      const split = new SplitType(subtitleRef.current, { types: 'words' });
      if (split.words) {
        gsap.set(split.words, { opacity: 0, y: 20 });
        tl.to(split.words, {
          opacity: 1, y: 0,
          duration: 0.5, stagger: 0.04, ease: 'power2.out',
        }, '-=0.3');
      }
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, hsl(230 25% 5% / 0.4) 50%, hsl(230 25% 5% / 0.9) 100%)',
      }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo placeholder */}
        <div ref={logoRef} className="mb-8 flex justify-center opacity-0">
          <div className="w-20 h-20 rounded-2xl glass neon-glow flex items-center justify-center">
            <span className="text-muted-foreground text-xs uppercase tracking-widest">Logo</span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 neon-text"
          style={{ perspective: '600px' }}
        >
          Silent Thunder Squad
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
        >
          Building Real-World Solutions with Innovation
        </p>

        <div className="mt-12 animate-float">
          <svg className="w-6 h-6 mx-auto text-primary opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
