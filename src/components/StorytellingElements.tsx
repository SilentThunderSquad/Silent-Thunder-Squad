import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A horizontal line that grows as you scroll — visual storytelling divider.
 */
export function StoryDivider() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div className="py-16 flex justify-center">
      <div
        ref={lineRef}
        className="w-40 h-px origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(210 100% 55% / 0.6), hsl(270 60% 55% / 0.6), transparent)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

/**
 * Chapter number with vertical line — storytelling progress indicator.
 */
export function ChapterMarker({ number, label }: { number: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      }
    );
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: lineRef.current, start: 'top 85%' },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center py-16">
      <div
        ref={lineRef}
        className="w-px h-20 origin-top mb-6"
        style={{
          background: 'linear-gradient(to bottom, transparent, hsl(210 100% 55% / 0.5))',
          willChange: 'transform',
        }}
      />
      <div ref={ref} className="text-center">
        <span className="text-primary font-heading text-sm tracking-[0.3em] uppercase opacity-60">{number}</span>
        <p className="text-muted-foreground text-xs mt-1 tracking-widest uppercase">{label}</p>
      </div>
    </div>
  );
}

/**
 * Ambient floating dots background for storytelling sections.
 */
export function AmbientDots() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const dots = containerRef.current.children;
    Array.from(dots).forEach((dot, i) => {
      gsap.to(dot, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0
              ? 'hsl(210 100% 55% / 0.3)'
              : 'hsl(270 60% 55% / 0.2)',
          }}
        />
      ))}
    </div>
  );
}
