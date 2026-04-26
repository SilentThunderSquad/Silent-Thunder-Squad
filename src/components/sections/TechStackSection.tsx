import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Tech data ─────────────────────────────────────────────────────── */

interface TechItem {
  name: string;
  /** SVG path(s) or text fallback rendered inside a viewBox="0 0 24 24" */
  svg: string;
  color: string;
  glow: string;
}

const TECH_ITEMS: TechItem[] = [
  {
    name: 'React',
    svg: `<circle cx="12" cy="12" r="2.5" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.2"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.2" transform="rotate(120 12 12)"/>`,
    color: '#61DAFB',
    glow: '0 0 24px rgba(97,218,251,0.4)',
  },
  {
    name: 'TypeScript',
    svg: `<rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" opacity="0.15"/><text x="12" y="17" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" font-family="monospace">TS</text>`,
    color: '#3178C6',
    glow: '0 0 24px rgba(49,120,198,0.4)',
  },
  {
    name: 'JavaScript',
    svg: `<rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" opacity="0.15"/><text x="12" y="17" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" font-family="monospace">JS</text>`,
    color: '#F7DF1E',
    glow: '0 0 24px rgba(247,223,30,0.35)',
  },
  {
    name: 'Node.js',
    svg: `<path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="none" stroke="currentColor" stroke-width="1.3"/><text x="12" y="15" text-anchor="middle" font-size="7" font-weight="700" fill="currentColor" font-family="monospace">N</text>`,
    color: '#339933',
    glow: '0 0 24px rgba(51,153,51,0.4)',
  },
  {
    name: 'Python',
    svg: `<path d="M12 2c-2.8 0-4.5 1.2-4.5 3v2h5v1H6.5C4.2 8 3 9.8 3 12.5S4.2 17 6.5 17H8v-2.5C8 12.2 9.8 11 12 11h4.5c1.9 0 3.5-1.6 3.5-3.5V5c0-1.6-1.6-3-3.5-3H12zm-1.5 1.5a1 1 0 110 2 1 1 0 010-2z" fill="currentColor"/><path d="M12 22c2.8 0 4.5-1.2 4.5-3v-2h-5v-1h6C19.8 16 21 14.2 21 11.5S19.8 7 17.5 7H16v2.5c0 2.3-1.8 3.5-4 3.5H7.5C5.6 13 4 14.6 4 16.5V19c0 1.6 1.6 3 3.5 3H12zm1.5-1.5a1 1 0 110-2 1 1 0 010 2z" fill="currentColor"/>`,
    color: '#3776AB',
    glow: '0 0 24px rgba(55,118,171,0.4)',
  },
  {
    name: 'Tailwind CSS',
    svg: `<path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.36 10.84 14.5 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.64 7.16 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.36 16.84 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.64 13.16 9.5 12 7 12z" fill="currentColor"/>`,
    color: '#06B6D4',
    glow: '0 0 24px rgba(6,182,212,0.4)',
  },
  {
    name: 'Next.js',
    svg: `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 8l8.5 11M15 8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    color: '#a0a0a0',
    glow: '0 0 24px rgba(160,160,160,0.3)',
  },
  {
    name: 'Three.js',
    svg: `<path d="M3 3h18L12 21 3 3z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M7.5 3L12 12l4.5-9" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>`,
    color: '#a78bfa',
    glow: '0 0 24px rgba(167,139,250,0.4)',
  },
  {
    name: 'Figma',
    svg: `<circle cx="15" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="9" cy="8" r="3" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1.3"/><circle cx="9" cy="14" r="3" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1.3"/><circle cx="9" cy="20" r="3" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.3"/><rect x="12" y="11" width="6" height="6" rx="3" fill="none" stroke="currentColor" stroke-width="1.3"/>`,
    color: '#F24E1E',
    glow: '0 0 24px rgba(242,78,30,0.4)',
  },
  {
    name: 'Git',
    svg: `<path d="M21.6 11.2L12.8 2.4a1.4 1.4 0 00-2 0L9 4.2l2.5 2.5a1.7 1.7 0 012.1 2.1l2.4 2.4a1.7 1.7 0 11-1 1L12.7 10v5.3a1.7 1.7 0 11-1.4-.1V9.8a1.7 1.7 0 01-.9-2.2L8 5.2 2.4 10.8a1.4 1.4 0 000 2l8.8 8.8a1.4 1.4 0 002 0l8.4-8.4a1.4 1.4 0 000-2z" fill="currentColor"/>`,
    color: '#F05032',
    glow: '0 0 24px rgba(240,80,50,0.4)',
  },
  {
    name: 'Docker',
    svg: `<path d="M4 12h3v3H4zM8 12h3v3H8zM12 12h3v3h-3zM8 8h3v3H8zM12 8h3v3h-3zM12 4h3v3h-3zM16 8h3v3h-3z" fill="currentColor" opacity="0.6" stroke="currentColor" stroke-width="0.5"/><path d="M22 12.5c-.5-1-1.5-1.5-1.5-1.5s-1 2-4 2H3c0 4 2.5 7 8 7s9-3.5 9-7c1 0 2-.5 2-0.5z" fill="currentColor" opacity="0.25" stroke="currentColor" stroke-width="1"/>`,
    color: '#2496ED',
    glow: '0 0 24px rgba(36,150,237,0.4)',
  },
  {
    name: 'Firebase',
    svg: `<path d="M5 19L7.3 3.6a.5.5 0 01.9-.2l2.5 4.7L12 5.8a.5.5 0 01.9 0L19 19H5z" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1"/><path d="M5 19l5.3-3.3L7.8 10 5 19z" fill="currentColor" opacity="0.5"/>`,
    color: '#FFCA28',
    glow: '0 0 24px rgba(255,202,40,0.4)',
  },
  {
    name: 'MongoDB',
    svg: `<path d="M12 2c-1 2-4 4-4 8 0 4 2 8 4 12 2-4 4-8 4-12 0-4-3-6-4-8z" fill="currentColor" opacity="0.4" stroke="currentColor" stroke-width="1"/><line x1="12" y1="22" x2="12" y2="10" stroke="currentColor" stroke-width="1.5"/>`,
    color: '#47A248',
    glow: '0 0 24px rgba(71,162,72,0.4)',
  },
  {
    name: 'PostgreSQL',
    svg: `<ellipse cx="12" cy="8" rx="7" ry="4" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M5 8v8c0 2.2 3.1 4 7 4s7-1.8 7-4V8" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M5 12c0 2.2 3.1 4 7 4s7-1.8 7-4" fill="none" stroke="currentColor" stroke-width="1"/>`,
    color: '#4169E1',
    glow: '0 0 24px rgba(65,105,225,0.4)',
  },
  {
    name: 'AWS',
    svg: `<text x="12" y="15" text-anchor="middle" font-size="8" font-weight="700" fill="currentColor" font-family="sans-serif">AWS</text><path d="M6 17c3 2 9 2 12 0" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
    color: '#FF9900',
    glow: '0 0 24px rgba(255,153,0,0.4)',
  },
  {
    name: 'GraphQL',
    svg: `<polygon points="12,3 20,8 20,16 12,21 4,16 4,8" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="3" r="1.5" fill="currentColor"/><circle cx="20" cy="8" r="1.5" fill="currentColor"/><circle cx="20" cy="16" r="1.5" fill="currentColor"/><circle cx="12" cy="21" r="1.5" fill="currentColor"/><circle cx="4" cy="16" r="1.5" fill="currentColor"/><circle cx="4" cy="8" r="1.5" fill="currentColor"/>`,
    color: '#E10098',
    glow: '0 0 24px rgba(225,0,152,0.4)',
  },
  {
    name: 'Vite',
    svg: `<path d="M21 3L12 22 7 11 21 3z" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1"/><path d="M3 5l9 17L7 11 3 5z" fill="currentColor" opacity="0.5"/>`,
    color: '#646CFF',
    glow: '0 0 24px rgba(100,108,255,0.4)',
  },
  {
    name: 'GSAP',
    svg: `<rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.2"/><text x="12" y="15.5" text-anchor="middle" font-size="7" font-weight="800" fill="currentColor" font-family="monospace">GS</text>`,
    color: '#88CE02',
    glow: '0 0 24px rgba(136,206,2,0.4)',
  },
];

/* ── Icon card ─────────────────────────────────────────────────────── */

function TechCard({ item }: { item: TechItem }) {
  return (
    <div
      className="tech-card group relative flex-shrink-0"
      style={{ width: 'clamp(100px, 14vw, 160px)' }}
    >
      <div
        className="relative flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-500 cursor-pointer"
        style={{
          background: 'hsl(210 40% 98% / 0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid hsl(220 25% 88% / 0.4)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = item.color + '66';
          el.style.boxShadow = item.glow;
          el.style.transform = 'scale(1.12) translateY(-8px)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = 'hsl(220 25% 88% / 0.4)';
          el.style.boxShadow = 'none';
          el.style.transform = '';
        }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          style={{
            width: 'clamp(40px, 5vw, 56px)',
            height: 'clamp(40px, 5vw, 56px)',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
            border: `1px solid ${item.color}22`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="transition-colors duration-300"
            style={{
              width: 'clamp(22px, 3vw, 30px)',
              height: 'clamp(22px, 3vw, 30px)',
              color: item.color,
            }}
            dangerouslySetInnerHTML={{ __html: item.svg }}
          />
        </div>
        {/* Label */}
        <span
          className="text-xs font-medium text-muted-foreground tracking-wide whitespace-nowrap transition-colors duration-300 group-hover:text-foreground"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {item.name}
        </span>
        {/* Hover glow ring */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${item.color}08, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────────────────── */

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const section = sectionRef.current;

    // Calculate scroll distance: full track width minus one viewport
    const getScrollDistance = () => track.scrollWidth - window.innerWidth;

    // Heading reveal
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }

    // Individual card stagger reveal
    const cards = track.querySelectorAll('.tech-card');
    gsap.set(cards, { opacity: 0, y: 30 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
      },
    });

    // Horizontal scroll animation
    const scrollTween = gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Handle resize
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      scrollTween.kill();
      window.removeEventListener('resize', onResize);
      // Clean up all ScrollTriggers for this section
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      aria-label="Technologies and tools used by Silent Thunder Squad"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(210 40% 98%), hsl(220 30% 96%), hsl(210 40% 98%))' }}
    >
      {/* Subtle ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, hsl(221 83% 53% / 0.04), transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 rounded-full"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, hsl(262 83% 58% / 0.03), transparent 70%)',
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative min-h-screen flex flex-col justify-center py-20">
        {/* Header */}
        <div ref={headingRef} className="px-6 md:px-12 mb-12 opacity-0">
          <div className="max-w-6xl mx-auto">
            <p
              className="text-xs font-medium tracking-[0.3em] uppercase mb-3"
              style={{
                background: 'linear-gradient(90deg, hsl(221 83% 53%), hsl(262 83% 58%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Arsenal
            </p>
            <h2
              className="text-fluid-h2 font-bold font-heading"
              style={{
                background: 'linear-gradient(135deg, hsl(222 47% 10%), hsl(221 83% 53% / 0.8))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Technologies We Master
            </h2>
            <p className="text-muted-foreground text-fluid-lead mt-3 max-w-xl">
              Cutting-edge tools and frameworks powering every project we deliver.
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex items-center gap-5 md:gap-7 px-8 md:px-16 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {TECH_ITEMS.map((item) => (
            <TechCard key={item.name} item={item} />
          ))}
          {/* End spacer for comfortable scroll end */}
          <div className="flex-shrink-0" style={{ width: '10vw' }} aria-hidden="true" />
        </div>

        {/* Scroll hint */}
        <div className="px-6 md:px-12 mt-12">
          <div className="max-w-6xl mx-auto flex items-center gap-3 text-muted-foreground/50">
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            </div>
            <div
              className="h-px flex-1 max-w-[120px]"
              style={{
                background: 'linear-gradient(90deg, hsl(221 83% 53% / 0.2), transparent)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Fade edges */}
      <div
        className="absolute top-0 left-0 bottom-0 w-16 md:w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, hsl(210 40% 98%), transparent)' }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 w-16 md:w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(270deg, hsl(210 40% 98%), transparent)' }}
      />
    </section>
  );
}
