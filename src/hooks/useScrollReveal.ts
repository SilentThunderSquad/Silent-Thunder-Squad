import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Detect if the user prefers reduced motion. SSR-safe. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Detect mobile viewport (used to soften animations). */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

type RevealOptions = {
  /** Selector inside the container (e.g. ".reveal"). If omitted, the container itself animates. */
  selector?: string;
  /** Direction the elements come from. */
  from?: 'bottom' | 'top' | 'left' | 'right' | 'scale' | 'fade';
  /** Distance in px (default 40, mobile 24). */
  distance?: number;
  /** Stagger between children in seconds (default 0.08). */
  stagger?: number;
  /** Duration of each item (default 0.8). */
  duration?: number;
  /** ScrollTrigger start position (default 'top 85%'). */
  start?: string;
  /** Delay before first element (default 0). */
  delay?: number;
};

/**
 * Reveal elements with a fade + slide/scale once they enter the viewport.
 * Honors prefers-reduced-motion (renders elements immediately, no animation).
 * Properly cleans up via gsap.context.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const reduced = prefersReducedMotion();
    if (reduced) return; // leave elements visible as-is

    const mobile = isMobileViewport();
    const {
      selector,
      from = 'bottom',
      distance = mobile ? 24 : 40,
      stagger = 0.08,
      duration = mobile ? 0.6 : 0.8,
      start = 'top 85%',
      delay = 0,
    } = options;

    const ctx = gsap.context(() => {
      const targets: gsap.TweenTarget = selector
        ? ref.current!.querySelectorAll(selector)
        : ref.current!;

      const fromVars: gsap.TweenVars = { opacity: 0 };
      switch (from) {
        case 'bottom': fromVars.y = distance; break;
        case 'top': fromVars.y = -distance; break;
        case 'left': fromVars.x = -distance; break;
        case 'right': fromVars.x = distance; break;
        case 'scale': fromVars.scale = 0.92; break;
        case 'fade': break;
      }

      gsap.fromTo(targets, fromVars, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [
    options.selector,
    options.from,
    options.distance,
    options.stagger,
    options.duration,
    options.start,
    options.delay,
  ]);

  return ref;
}

/**
 * Subtle parallax: translates the element on Y as the viewport scrolls past it.
 * `speed` < 0 moves opposite to scroll (classic parallax). Disabled on reduced motion / mobile.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(speed = -40) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion() || isMobileViewport()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: -speed },
        {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
