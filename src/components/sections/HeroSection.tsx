import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import ParticleField from '../ParticleField';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 });

    if (logoRef.current) {
      tl.fromTo(logoRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' });
    }

    // Tagline intro
    if (taglineRef.current) {
      tl.fromTo(taglineRef.current, { opacity: 0, y: -10 }, { opacity: 0.5, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }

    if (titleRef.current) {
      const split = new SplitType(titleRef.current, { types: 'chars' });
      if (split.chars) {
        gsap.set(split.chars, { opacity: 0, y: 80, rotateX: -90, scale: 0.5 });
        tl.to(split.chars, {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          duration: 0.8, stagger: 0.04, ease: 'back.out(1.4)',
        }, '-=0.3');
      }
    }

    if (subtitleRef.current) {
      const split = new SplitType(subtitleRef.current, { types: 'words' });
      if (split.words) {
        gsap.set(split.words, { opacity: 0, y: 20, filter: 'blur(8px)' });
        tl.to(split.words, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.6, stagger: 0.05, ease: 'power2.out',
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

        <p
          ref={taglineRef}
          className="text-xs md:text-sm uppercase tracking-[0.4em] text-primary mb-6 font-light"
        >
          Est. 2024 — Innovation Collective
        </p>

        <h1
          ref={titleRef}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8 neon-text"
          style={{ perspective: '800px' }}
        >
          Silent Thunder Squad
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
        >
          Building Real-World Solutions with Innovation
        </p>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground opacity-50">Scroll to explore</span>
          <div className="w-px h-12" style={{
            background: 'linear-gradient(to bottom, hsl(210 100% 55% / 0.5), transparent)',
          }} />
        </div>
      </div>
    </section>
  );
}
