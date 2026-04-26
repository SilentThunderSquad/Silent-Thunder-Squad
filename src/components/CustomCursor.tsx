import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / reduced motion
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia?.('(pointer: coarse)').matches;
    if (reduced || isTouch) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    let magnetX = 0, magnetY = 0;
    let magnetTarget: HTMLElement | null = null;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Magnetic effect: pull cursor toward nearest interactive element within range
      const interactive = e.target instanceof Element
        ? (e.target.closest('button, a, [data-magnetic]') as HTMLElement | null)
        : null;

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.hypot(dx, dy);
        const maxDist = Math.max(rect.width, rect.height) * 0.8;
        if (dist < maxDist) {
          // Pull toward center (magnetic)
          mouseX = cx + dx * 0.55;
          mouseY = cy + dy * 0.55;
          // Apply subtle pull on the element itself
          if (magnetTarget && magnetTarget !== interactive) {
            magnetTarget.style.transform = '';
          }
          magnetTarget = interactive;
          magnetX = dx * 0.18;
          magnetY = dy * 0.18;
          interactive.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)';
          interactive.style.transform = `translate(${magnetX}px, ${magnetY}px)`;
        } else if (magnetTarget) {
          magnetTarget.style.transform = '';
          magnetTarget = null;
        }
      } else if (magnetTarget) {
        magnetTarget.style.transform = '';
        magnetTarget = null;
      }
    };

    const tick = () => {
      // Lerp positions for smooth follow
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailX - 20}px, ${trailY - 20}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    let raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      if (magnetTarget) magnetTarget.style.transform = '';
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-blue) / 0.9), transparent)',
        }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-purple) / 0.25), transparent)',
        }}
      />
    </>
  );
}
