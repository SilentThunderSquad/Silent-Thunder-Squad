import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import ParticleField from '../ParticleField';

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 });
    const splits: SplitType[] = [];


    if (taglineRef.current) {
      tl.fromTo(taglineRef.current, { opacity: 0, y: -10 }, { opacity: 0.5, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }

    if (titleRef.current) {
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

    return () => {
      tl.kill();
      splits.forEach(s => s.revert());
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / 0.4) 50%, hsl(var(--background) / 0.85) 100%)',
      }} />

      <div className="relative z-10 text-center px-4 sm:px-6 w-full mx-auto flex flex-col items-center justify-center">

        <p
          ref={taglineRef}
          className="text-xs md:text-sm uppercase tracking-[0.4em] text-primary mb-6 font-light text-center"
        >
          Est. 2024 — Innovation Collective
        </p>

        <div ref={titleRef} style={{ perspective: '800px' }} className="w-full flex justify-center">
          <h1
            className="font-heading font-bold tracking-tight leading-[1.1] mb-8 neon-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl whitespace-nowrap text-center mx-auto"
          >
            Silent Thunder Squad
          </h1>
        </div>

        <div ref={subtitleRef}>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Building Real-World Solutions with Innovation
          </p>
        </div>

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
