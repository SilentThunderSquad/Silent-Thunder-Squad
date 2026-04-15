import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const split = new SplitType(headingRef.current, { types: 'chars' });
      if (split.chars) {
        gsap.set(split.chars, { opacity: 0, y: 60, scale: 0.8 });
        gsap.to(split.chars, {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.04, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        });
      }
    }
    if (btnRef.current) {
      gsap.fromTo(btnRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: btnRef.current, start: 'top 90%' },
        }
      );
    }
  }, []);

  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, hsl(210 100% 55% / 0.05) 0%, transparent 70%)',
      }} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2
          ref={headingRef}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-10 neon-text"
        >
          Join the Thunder
        </h2>
        <button
          ref={btnRef}
          className="px-10 py-4 rounded-full font-heading font-semibold text-lg tracking-wide transition-all duration-300 animate-pulse-glow cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, hsl(210 100% 55%), hsl(270 60% 55%))',
            color: 'hsl(230 25% 5%)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 40px hsl(210 100% 55% / 0.6), 0 0 80px hsl(270 60% 55% / 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '';
          }}
        >
          Get In Touch
        </button>
      </div>

      <footer className="mt-32 text-center text-muted-foreground text-sm">
        <p>© 2026 Silent Thunder Squad. All rights reserved.</p>
      </footer>
    </section>
  );
}
