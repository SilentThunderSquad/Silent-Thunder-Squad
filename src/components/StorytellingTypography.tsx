import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A big kinetic text that scales up/fades as you scroll through it.
 * Creates dramatic "chapter title" moments between sections.
 */
export function ScrollRevealText({ text, subtitle }: { text: string; subtitle?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    tl.fromTo(textRef.current, 
      { scale: 0.3, opacity: 0, letterSpacing: '0.5em' },
      { scale: 1, opacity: 1, letterSpacing: '0.05em', duration: 0.5 }
    );
    tl.to(textRef.current, { scale: 1.8, opacity: 0, duration: 0.5 }, 0.5);

    if (subRef.current) {
      tl.fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 0.6, y: 0, duration: 0.3 }, 0.25);
      tl.to(subRef.current, { opacity: 0, y: -30, duration: 0.3 }, 0.55);
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={containerRef} className="h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="text-center px-6">
        <h2
          ref={textRef}
          className="font-heading text-5xl md:text-7xl lg:text-9xl font-bold gradient-text whitespace-nowrap"
          style={{ willChange: 'transform, opacity' }}
        >
          {text}
        </h2>
        {subtitle && (
          <p ref={subRef} className="text-muted-foreground text-lg md:text-xl mt-4 font-light tracking-wider">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Horizontal scrolling text marquee that moves on scroll.
 */
export function ScrollMarquee({ words, direction = 'left' }: { words: string[]; direction?: 'left' | 'right' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;
    const xVal = direction === 'left' ? '-30%' : '30%';
    const fromVal = direction === 'left' ? '10%' : '-10%';

    gsap.fromTo(innerRef.current,
      { x: fromVal },
      {
        x: xVal,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      }
    );
  }, [direction]);

  return (
    <div ref={containerRef} className="overflow-hidden py-8">
      <div ref={innerRef} className="flex gap-8 whitespace-nowrap" style={{ width: 'max-content' }}>
        {[...words, ...words, ...words].map((word, i) => (
          <span
            key={i}
            className="font-heading text-6xl md:text-8xl lg:text-[10rem] font-bold leading-none"
            style={{
              WebkitTextStroke: '1px hsl(210 100% 55% / 0.3)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Paragraph text where each word reveals with opacity and blur as you scroll.
 */
export function ScrollParagraph({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = text.split(' ');

  useEffect(() => {
    if (!containerRef.current) return;

    wordsRef.current.forEach((word, i) => {
      if (!word) return;
      gsap.fromTo(word,
        { opacity: 0.1, filter: 'blur(4px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: word,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-6">
      <p className="text-2xl md:text-4xl lg:text-5xl font-heading font-light leading-relaxed text-foreground">
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordsRef.current[i] = el; }}
            className="inline-block mr-[0.3em]"
            style={{ willChange: 'opacity, filter' }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}

/**
 * Counter/stat that counts up on scroll.
 */
export function ScrollCounter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numRef.current || !containerRef.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = Math.round(obj.val) + suffix;
      },
    });
  }, [value, suffix]);

  return (
    <div ref={containerRef} className="text-center">
      <span ref={numRef} className="font-heading text-5xl md:text-7xl font-bold gradient-text">0</span>
      <p className="text-muted-foreground mt-2 text-sm uppercase tracking-widest">{label}</p>
    </div>
  );
}

/**
 * Parallax text layers — multiple text layers moving at different speeds.
 */
export function ParallaxTextLayers({ layers }: { layers: { text: string; speed: number; opacity: number; size: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    layerRefs.current.forEach((layer, i) => {
      if (!layer) return;
      gsap.fromTo(layer,
        { y: layers[i].speed * 100 },
        {
          y: -layers[i].speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });
  }, [layers]);

  return (
    <div ref={containerRef} className="relative h-[60vh] overflow-hidden flex items-center justify-center">
      {layers.map((layer, i) => (
        <div
          key={i}
          ref={(el) => { layerRefs.current[i] = el; }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: layer.opacity, willChange: 'transform' }}
        >
          <span
            className="font-heading font-bold whitespace-nowrap gradient-text"
            style={{ fontSize: layer.size }}
          >
            {layer.text}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Text that rotates/flips each character on scroll.
 */
export function RotatingCharsText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    charRefs.current.forEach((char, i) => {
      if (!char) return;
      gsap.fromTo(char,
        { opacity: 0, rotateY: 90, y: 40 },
        {
          opacity: 1,
          rotateY: 0,
          y: 0,
          duration: 0.8,
          delay: i * 0.03,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  const chars = text.split('');

  return (
    <div ref={containerRef} className="text-center px-6" style={{ perspective: '1000px' }}>
      <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold">
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => { charRefs.current[i] = el; }}
            className="inline-block"
            style={{
              willChange: 'transform, opacity',
              color: char === ' ' ? 'transparent' : undefined,
              width: char === ' ' ? '0.3em' : undefined,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
}
