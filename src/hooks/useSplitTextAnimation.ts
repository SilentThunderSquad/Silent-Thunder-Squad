import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SplitMode = 'chars' | 'words' | 'lines';

export function useSplitTextAnimation(
  mode: SplitMode = 'chars',
  options?: {
    stagger?: number;
    duration?: number;
    y?: number;
    delay?: number;
    start?: string;
  }
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const split = new SplitType(ref.current, { types: mode });
    const elements = mode === 'chars' ? split.chars : mode === 'words' ? split.words : split.lines;

    if (!elements) return;

    gsap.set(elements, { opacity: 0, y: options?.y ?? 30 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.6,
      stagger: options?.stagger ?? (mode === 'chars' ? 0.02 : mode === 'words' ? 0.05 : 0.1),
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: options?.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [mode, options?.stagger, options?.duration, options?.y, options?.delay, options?.start]);

  return ref;
}
