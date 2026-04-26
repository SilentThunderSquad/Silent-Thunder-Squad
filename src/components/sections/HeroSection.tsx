import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import ParticleField from '../ParticleField';

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 });
    const splits: SplitType[] = [];


    if (taglineRef.current) {
      tl.fromTo(taglineRef.current, { opacity: 0, y: -10 }, { opacity: 0.5, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }

    if (titleRef.current) {
      // Make the title wrapper visible now that GSAP is ready to control it
      gsap.set(titleRef.current, { visibility: 'visible' });
      const split = new SplitType(titleRef.current, { types: 'chars' });
      splits.push(split);
      if (split.chars) {
        // Wrap each char so we can clip with overflow-hidden and reveal from a single baseline
        split.chars.forEach((char) => {
          const el = char as HTMLElement;
          el.style.display = 'inline-block';
          el.style.overflow = 'hidden';
          el.style.verticalAlign = 'bottom';
          const inner = document.createElement('span');
          inner.style.display = 'inline-block';
          inner.style.willChange = 'transform';
          inner.textContent = el.textContent;
          el.textContent = '';
          el.appendChild(inner);
        });
        const inners = titleRef.current.querySelectorAll<HTMLElement>('.char > span');
        gsap.set(inners, { yPercent: 110 });
        tl.to(inners, {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.05,
          ease: 'power4.out',
        }, '-=0.3');
      }
    }

    if (subtitleRef.current) {
      const split = new SplitType(subtitleRef.current, { types: 'words' });
      splits.push(split);
      if (split.words) {
        gsap.set(split.words, { opacity: 0, y: 20, filter: 'blur(8px)' });
        tl.to(split.words, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.6, stagger: 0.05, ease: 'power2.out',
        }, '-=0.3');
      }
    }

    // Fade in the scroll indicator after the main text sequence
    if (scrollRef.current) {
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 0.3, duration: 0.8, ease: 'power2.out' }, '-=0.2');
    }

    return () => {
      tl.kill();
      splits.forEach(s => s.revert());
    };
  }, []);

  return (
    <section id="hero" aria-label="Hero — Silent Thunder Squad" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ParticleField />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, transparent 0%, hsl(var(--background) / 0.1) 50%, hsl(var(--background) / 0.3) 100%)',
      }} />

      <div className="relative z-10 text-center px-4 sm:px-6 w-full mx-auto flex flex-col items-center justify-center pointer-events-none select-none">

        <p
          ref={taglineRef}
          className="text-fluid-tagline uppercase tracking-[0.4em] text-muted-foreground mb-6 font-light text-center opacity-0"
        >
          Est. 2025 — Innovation Collective
        </p>

        <div ref={titleRef} className="relative w-full flex justify-center" style={{ visibility: 'hidden' }}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 mx-auto"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.03) 40%, transparent 75%)',
              filter: 'blur(60px)',
            }}
          />
          <h1
            className="font-display font-bold mb-8 text-foreground text-fluid-hero text-center mx-auto max-w-[14ch] sm:max-w-none sm:whitespace-nowrap"
          >
            Silent Thunder Squad
          </h1>
          <p className="sr-only">Affordable web development company India — Student-led developer team offering custom website development, UI/UX design, and full-stack solutions for startups.</p>
        </div>

        <div ref={subtitleRef} className="opacity-0">
          <p className="text-fluid-lead text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Building Real-World Solutions with Innovation
          </p>
        </div>

        <div ref={scrollRef} className="mt-16 flex flex-col items-center gap-2 animate-float opacity-0">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60">Scroll to explore</span>
          <div className="w-px h-12 bg-border" />
        </div>
      </div>
    </section>
  );
}
