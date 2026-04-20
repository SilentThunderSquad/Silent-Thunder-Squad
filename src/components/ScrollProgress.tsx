import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressBarRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Just show full bar without animation
      gsap.set(progressBarRef.current, { scaleX: 1 });
      return;
    }

    // Create scroll-triggered progress animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={progressBarRef}
        className="h-full origin-left bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#22D3EE]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
