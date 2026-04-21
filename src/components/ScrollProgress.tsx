import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      rafRef.current = null;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const progress = Math.min(1, Math.max(0, scrollTop / max));
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    if (prefersReducedMotion) {
      bar.style.transform = 'scaleX(1)';
      return;
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#22D3EE] will-change-transform"
        style={{ transform: 'scaleX(0)', transition: 'transform 0.1s linear' }}
      />
    </div>
  );
}
