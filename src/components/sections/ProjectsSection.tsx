import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'NeuralVault', desc: 'AI-powered knowledge management platform', tag: 'Machine Learning', color: '#3b82f6' },
  { title: 'CipherLink', desc: 'End-to-end encrypted communication network', tag: 'Security', color: '#8b5cf6' },
  { title: 'QuantumDash', desc: 'Real-time analytics dashboard for enterprises', tag: 'Analytics', color: '#06b6d4' },
  { title: 'EcoSphere', desc: 'Sustainable living companion application', tag: 'Mobile', color: '#10b981' },
  { title: 'ArcReality', desc: 'Immersive AR experience engine', tag: 'AR/VR', color: '#f59e0b' },
];

export default function ProjectsSection() {
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const splits: SplitType[] = [];

    if (headingWrapRef.current) {
      const h2 = headingWrapRef.current.querySelector('h2');
      if (h2) {
        const split = new SplitType(h2, { types: 'chars' });
        splits.push(split);
        if (split.chars) {
          gsap.set(split.chars, { opacity: 0, y: 40 });
          gsap.to(split.chars, {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.02, ease: 'power3.out',
            scrollTrigger: { trigger: h2, start: 'top 80%' },
          });
        }
      }
    }

    if (scrollRef.current && containerRef.current) {
      const totalWidth = scrollRef.current.scrollWidth - window.innerWidth;
      gsap.to(scrollRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    return () => { splits.forEach(s => s.revert()); };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <div ref={scrollRef} className="flex items-center min-h-screen gap-8 px-6 md:px-16" style={{ width: 'max-content' }}>
        <div className="w-[40vw] md:w-[30vw] shrink-0">
          <div ref={headingWrapRef}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-4">
              Project Showcase
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">Scroll to explore our work →</p>
        </div>
        {projects.map((p) => (
          <div
            key={p.title}
            className="w-[80vw] md:w-[35vw] shrink-0 glass rounded-2xl p-8 group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            style={{ borderTop: `2px solid ${p.color}40` }}
          >
            <div className="h-48 rounded-xl mb-6 flex items-center justify-center" style={{
              background: `linear-gradient(135deg, ${p.color}15, ${p.color}05)`,
              border: `1px solid ${p.color}20`,
            }}>
              <span className="text-muted-foreground text-sm uppercase tracking-widest">Preview</span>
            </div>
            <span className="text-xs uppercase tracking-widest font-medium px-3 py-1 rounded-full" style={{
              color: p.color,
              background: `${p.color}15`,
            }}>
              {p.tag}
            </span>
            <h3 className="font-heading text-2xl font-bold mt-4 mb-2 text-foreground">{p.title}</h3>
            <p className="text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
