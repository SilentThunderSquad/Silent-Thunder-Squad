import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ExternalLink, Github, CheckCircle2, Clock, Circle } from 'lucide-react';
import aroviaImg from '@/assets/project-arovia.png';
import billVaultImg from '@/assets/project-billvault.png';
import readmeGenImg from '@/assets/project-readmegen.png';

gsap.registerPlugin(ScrollTrigger);

type MilestoneStatus = 'done' | 'active' | 'upcoming';

interface Milestone {
  label: string;
  date: string;
  status: MilestoneStatus;
}

interface Project {
  title: string;
  desc: string;
  tag: string;
  color: string;
  image: string;
  demo: string;
  github: string;
  altText: string;
  ongoing: boolean;
  progress: number;
  startDate: string;
  endDate: string;
  milestones: Milestone[];
}

const projects: Project[] = [
  {
    title: 'Arovia',
    desc: 'The AI-Powered Doctor Recommendation System helps you quickly find the right doctor based on your symptoms, location, and preferences.',
    tag: 'Machine Learning',
    color: '#3b82f6',
    image: aroviaImg,
    demo: 'https://arovia.silentthundersquad.in',
    github: 'https://github.com/SilentThunderSquad/Arovia',
    altText: 'Arovia — AI-powered doctor recommendation system built by Silent Thunder Squad',
    ongoing: true,
    progress: 75,
    startDate: 'Jan 2025',
    endDate: 'Ongoing',
    milestones: [
      { label: 'Research & Planning', date: 'Jan 2025', status: 'done' },
      { label: 'ML Model Development', date: 'Mar 2025', status: 'done' },
      { label: 'MVP Launch', date: 'May 2025', status: 'done' },
      { label: 'AI Recommendations v2', date: 'Jun 2025', status: 'active' },
      { label: 'Full Public Release', date: 'Aug 2025', status: 'upcoming' },
    ],
  },
  {
    title: 'Bill Vault',
    desc: 'A smart platform that helps you easily store and manage your bills, receipts, and warranties in one place with automatic scanning and timely reminders.',
    tag: 'Security',
    color: '#8b5cf6',
    image: billVaultImg,
    demo: 'https://billvault.silentthundersquad.in',
    github: 'https://github.com/SilentThunderSquad/Bill-Vault',
    altText: 'Bill Vault — smart bill and receipt management web app by Silent Thunder Squad',
    ongoing: true,
    progress: 60,
    startDate: 'Feb 2025',
    endDate: 'Ongoing',
    milestones: [
      { label: 'UI/UX Design', date: 'Feb 2025', status: 'done' },
      { label: 'Auth & Storage Setup', date: 'Mar 2025', status: 'done' },
      { label: 'Receipt Scanner', date: 'May 2025', status: 'active' },
      { label: 'Warranty Tracker', date: 'Jul 2025', status: 'upcoming' },
      { label: 'Mobile App', date: 'Sep 2025', status: 'upcoming' },
    ],
  },
  {
    title: 'README Generator',
    desc: 'A smart tool that helps developers create clean, professional GitHub profile READMEs in minutes with auto-generated structured content.',
    tag: 'Automation',
    color: '#06b6d4',
    image: readmeGenImg,
    demo: 'https://readmegen.silentthundersquad.in',
    github: 'https://github.com/SilentThunderSquad/GitHub-Profile-README-Generator',
    altText: 'GitHub Profile README Generator — developer automation tool by Silent Thunder Squad',
    ongoing: false,
    progress: 100,
    startDate: 'Dec 2024',
    endDate: 'Apr 2025',
    milestones: [
      { label: 'Core Builder', date: 'Dec 2024', status: 'done' },
      { label: 'Templates Library', date: 'Jan 2025', status: 'done' },
      { label: 'Live Preview', date: 'Feb 2025', status: 'done' },
      { label: 'Export & Deploy', date: 'Apr 2025', status: 'done' },
    ],
  },
];

function MilestoneIcon({ status, color }: { status: MilestoneStatus; color: string }) {
  if (status === 'done') {
    return <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color }} />;
  }
  if (status === 'active') {
    return (
      <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ backgroundColor: color }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: color }}
        />
      </span>
    );
  }
  return <Circle className="w-3.5 h-3.5 shrink-0 opacity-30" style={{ color }} />;
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className="w-[85vw] md:w-[38vw] shrink-0 glass hover-lift rounded-2xl overflow-hidden group cursor-pointer flex flex-col"
      style={{ borderTop: `2px solid ${p.color}60` }}
    >
      {/* Thumbnail */}
      <div
        className="h-44 relative overflow-hidden shrink-0"
        style={{ borderBottom: `1px solid ${p.color}20` }}
      >
        <img
          src={p.image}
          alt={p.altText}
          loading="lazy"
          width={1024}
          height={640}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          style={{ willChange: 'transform' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${p.color}30, transparent 60%)` }}
        />

        {/* Status badge — top right */}
        <div className="absolute top-3 right-3">
          {p.ongoing ? (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{ background: `${p.color}25`, color: p.color, border: `1px solid ${p.color}50` }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: p.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: p.color }}
                />
              </span>
              Live
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{ background: '#10b98125', color: '#10b981', border: '1px solid #10b98150' }}
            >
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </span>
          )}
        </div>

        {/* Date range — bottom left */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs text-white/70 backdrop-blur-sm bg-black/30 px-2 py-0.5 rounded-md font-mono">
            {p.startDate} → {p.endDate}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tag */}
        <div className="mb-2">
          <span
            className="text-xs uppercase tracking-widest font-medium px-2.5 py-0.5 rounded-full"
            style={{ color: p.color, background: `${p.color}15` }}
          >
            {p.tag}
          </span>
        </div>

        <h3 className="font-heading text-xl font-bold mb-2 text-foreground">{p.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.desc}</p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-muted-foreground font-medium">Progress</span>
            <span className="text-xs font-bold" style={{ color: p.color }}>{p.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${p.progress}%`,
                background: `linear-gradient(90deg, ${p.color}99, ${p.color})`,
                boxShadow: p.ongoing ? `0 0 8px ${p.color}80` : 'none',
              }}
            />
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2.5 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Timeline
          </p>
          <div className="space-y-2">
            {p.milestones.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <MilestoneIcon status={m.status} color={p.color} />
                <span
                  className="text-xs flex-1 leading-tight"
                  style={{
                    color:
                      m.status === 'done'
                        ? 'hsl(var(--foreground))'
                        : m.status === 'active'
                        ? p.color
                        : 'hsl(var(--muted-foreground))',
                    fontWeight: m.status === 'active' ? 600 : 400,
                    opacity: m.status === 'upcoming' ? 0.6 : 1,
                  }}
                >
                  {m.label}
                </span>
                <span className="text-xs text-muted-foreground font-mono shrink-0 opacity-60">
                  {m.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
          <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}40` }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-background/50 text-foreground transition-all duration-300 hover:scale-105 hover:bg-background"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

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
    <section
      ref={containerRef}
      id="projects"
      aria-label="Project portfolio by Silent Thunder Squad"
      className="relative overflow-hidden"
    >
      <div
        ref={scrollRef}
        className="flex items-center min-h-screen gap-8 px-6 md:px-16"
        style={{ width: 'max-content' }}
      >
        {/* Intro panel */}
        <div className="w-[40vw] md:w-[28vw] shrink-0">
          <div ref={headingWrapRef}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-4">
              Project Showcase
            </h2>
          </div>
          <p className="text-muted-foreground text-lg mb-6">Scroll to explore our work →</p>

          {/* Legend */}
          <div className="space-y-2.5">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
              Status Legend
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <span>Milestone completed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
              </span>
              <span>Currently in progress</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Circle className="w-3.5 h-3.5 opacity-30" />
              <span>Planned upcoming</span>
            </div>
          </div>
        </div>

        {/* Project cards */}
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}
