import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ExternalLink, Github } from 'lucide-react';
import neuralVaultImg from '@/assets/project-neuralvault.jpg';
import cipherLinkImg from '@/assets/project-cipherlink.jpg';
import quantumDashImg from '@/assets/project-quantumdash.jpg';
import ecoSphereImg from '@/assets/project-ecosphere.jpg';
import arcRealityImg from '@/assets/project-arcreality.jpg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Arovia', desc: 'The AI-Powered Doctor Recommendation System helps you quickly find the right doctor based on your symptoms, location, and preferences. Using smart AI, it gives personalized suggestions so you can get the best care without wasting time.', tag: 'Machine Learning', color: '#3b82f6', image: neuralVaultImg, demo: 'https://arovia.silentthundersquad.in', github: 'https://github.com/SilentThunderSquad/Arovia', altText: 'Arovia — AI-powered doctor recommendation system built by Silent Thunder Squad, showcasing machine learning web development in India' },
  { title: 'Bill Vault', desc: 'Bill Vault is a smart platform that helps you easily store and manage your bills, receipts, and warranties in one place. With features like automatic scanning, warranty tracking, and timely reminders, it keeps everything organized so you never miss important details.', tag: 'Security', color: '#8b5cf6', image: cipherLinkImg, demo: 'https://billvault.silentthundersquad.in', github: 'https://github.com/SilentThunderSquad/Bill-Vault', altText: 'Bill Vault — smart bill and receipt management web app developed by student developers at Silent Thunder Squad India' },
  { title: 'GitHub Profile README Generator', desc: 'GitHub Profile README Generator is a smart tool that helps developers create clean, professional, and attractive GitHub profile READMEs in minutes. It simplifies the process by generating well-structured content, allowing users to showcase their skills, projects, and achievements effortlessly.', tag: 'Automation', color: '#06b6d4', image: quantumDashImg, demo: 'https://readmegen.silentthundersquad.in', github: 'https://github.com/SilentThunderSquad/GitHub-Profile-README-Generator', altText: 'GitHub Profile README Generator — developer automation tool by Silent Thunder Squad, custom web app development India' },
  // { title: 'EcoSphere', desc: 'Sustainable living companion application', tag: 'Mobile', color: '#10b981', image: ecoSphereImg, demo: 'https://example.com', github: 'https://github.com' },
  // { title: 'ArcReality', desc: 'Immersive AR experience engine', tag: 'AR/VR', color: '#f59e0b', image: arcRealityImg, demo: 'https://example.com', github: 'https://github.com' },
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
    <section ref={containerRef} id="projects" aria-label="Project portfolio by Silent Thunder Squad" className="relative overflow-hidden">
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
            className="w-[80vw] md:w-[35vw] shrink-0 glass hover-lift rounded-2xl p-8 group cursor-pointer"
            style={{ borderTop: `2px solid ${p.color}40` }}
          >
            <div
              className="h-48 rounded-xl mb-6 overflow-hidden relative"
              style={{
                border: `1px solid ${p.color}20`,
                boxShadow: `0 8px 32px -8px ${p.color}30`,
              }}
            >
              <img
                src={p.image}
                alt={p.altText || `${p.title} project preview`}
                loading="lazy"
                width={1024}
                height={640}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                style={{ willChange: 'transform' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${p.color}25, transparent 60%)` }}
              />
            </div>
            <span className="text-xs uppercase tracking-widest font-medium px-3 py-1 rounded-full" style={{
              color: p.color,
              background: `${p.color}15`,
            }}>
              {p.tag}
            </span>
            <h3 className="font-heading text-2xl font-bold mt-4 mb-2 text-foreground">{p.title}</h3>
            <p className="text-muted-foreground mb-6">{p.desc}</p>
            <div className="flex items-center gap-3">
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: `${p.color}15`,
                  color: p.color,
                  border: `1px solid ${p.color}40`,
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-background/50 text-foreground transition-all duration-300 hover:scale-105 hover:bg-background"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
