import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import ThunderParticles from '../ThunderParticles';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const splits: SplitType[] = [];

    if (headingWrapRef.current) {
      const h2 = headingWrapRef.current.querySelector('h2');
      if (h2) {
        const split = new SplitType(h2, { types: 'chars' });
        splits.push(split);
        if (split.chars) {
          gsap.set(split.chars, { opacity: 0, y: 60, scale: 0.8 });
          gsap.to(split.chars, {
            opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.04, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: h2, start: 'top 80%' },
          });
        }
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

    return () => { splits.forEach(s => s.revert()); };
  }, []);

  return (
    <section className="py-40 px-6 relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, hsl(var(--neon-purple) / 0.12) 0%, hsl(var(--neon-blue) / 0.06) 40%, transparent 75%)',
      }} />
      {/* Interactive thunder particle field — hover to morph into a lightning bolt */}
      <ThunderParticles className="pointer-events-auto" />
      <div className="max-w-4xl mx-auto text-center relative z-10 pointer-events-none">
        <div ref={headingWrapRef}>
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-10 neon-text">
            Join the Thunder
          </h2>
        </div>
        <button
          ref={btnRef}
          className="btn-smooth px-10 py-4 rounded-full font-heading font-semibold text-lg tracking-wide animate-pulse-glow cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
            color: 'hsl(var(--primary-foreground))',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 40px hsl(var(--primary) / 0.6), 0 0 80px hsl(var(--accent) / 0.3)';
          }}
          onMouseLeave={(e) => {
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
