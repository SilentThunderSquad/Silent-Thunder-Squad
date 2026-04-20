import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Globe, Sparkles } from 'lucide-react';
import { RotatingCharsText } from '../StorytellingTypography';
import vivekImg from '@/assets/vivek.jpg';
import omImg from '@/assets/om.jpg';
import anujImg from '@/assets/anuj.jpg';
import navImg from '@/assets/nav.jpg';
import rajitImg from '@/assets/rajit.jpg';
import priyanshuImg from '@/assets/priyanshu.jpg';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { 
    name: 'Vivek Kumar Verma', 
    role: 'Full Stack & DevOps', 
    desc: 'Visionary team leader and architect, bridging the gap between full-stack innovation and scalable DevOps orchestration.', 
    img: vivekImg, 
    accent: 'hsl(210 100% 55%)',
    isLeader: true,
    links: { github: 'https://github.com/vivekverma807', linkedin: 'https://linkedin.com/in/vivekverma807', twitter: 'https://x.com/vivekverma807', portfolio: 'https://vivek.silentthundersquad.in' }
  },
  { 
    name: 'Om Singh', 
    role: 'Backend & ML Engineer', 
    desc: 'Specializing in robust backend systems and machine learning models that power intelligent, data-driven applications.', 
    img: omImg, 
    accent: 'hsl(270 70% 60%)',
    links: { github: 'https://github.com/om-singhhh', linkedin: 'https://linkedin.com/in/om-singh-engineer', twitter: 'https://x.com/omsingh', portfolio: 'https://om.dev' }
  },
  { 
    name: 'Anuj Vashishth', 
    role: 'Frontend Developer & Data Entry', 
    desc: 'Designing responsive, fluid frontend interfaces while ensuring data integrity and precision through meticulous management.', 
    img: anujImg, 
    accent: 'hsl(190 100% 55%)',
    links: { github: 'https://github.com/anujvashishth', linkedin: 'https://linkedin.com/in/anuj-vashishtha-b16667296', portfolio: 'https://anuj.silentthundersquad.in' }
  },
  { 
    name: 'Nav Sharma', 
    role: 'UI/UX Designer & Data Analyst', 
    desc: 'Merging creative UI/UX artistry with analytical data precision to build interfaces that are as functional as they are beautiful.', 
    img: navImg, 
    accent: 'hsl(150 80% 50%)',
    links: { github: 'https://github.com/navsharma15', linkedin: 'https://linkedin.com/in/nav-sharma', portfolio: 'https://nav.silentthundersquad.in' }
  },
  { 
    name: 'Rajit Shikharwar', 
    role: 'Data Analyst & Cloud DBA', 
    desc: 'Expertly handling complex cloud database architectures and translating raw data into actionable strategic intelligence.', 
    img: rajitImg, 
    accent: 'hsl(25 95% 55%)',
    links: { github: 'https://github.com/rajit-sikharwar', linkedin: 'https://linkedin.com/in/rajit-sikharwar/', twitter: 'https://x.com/rajit8279', portfolio: 'https://rajit.silentthundersquad.in' }
  },
  { 
    name: 'Priyanshu Varshney', 
    role: 'Backend & Java Developer', 
    desc: 'Crafting scalable, high-concurrency backend solutions and enterprise-grade applications within the Java ecosystem.', 
    img: priyanshuImg, 
    accent: 'hsl(0 80% 60%)',
    links: { github: 'https://github.com/dev-priyanshu5191', linkedin: 'https://linkedin.com/in/priyanshu5191', twitter: 'https://x.com/priyanshu5191', portfolio: 'https://priyanshu.silentthundersquad.in' }
  },
];

function TeamCard({ name, role, desc, img, accent, index, links, isLeader }: { name: string; role: string; desc: string; img: string; accent: string; index: number; links: { github: string; linkedin: string; twitter: string; portfolio: string }; isLeader?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: index * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 90%' },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="team-card glass hover-lift rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col"
      style={{
        border: `1px solid ${isLeader ? accent : accent + '30'}`,
        boxShadow: isLeader ? `0 0 20px ${accent}20` : '',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 24px 60px -20px ${accent}55, 0 0 0 1px ${accent}80`;
        e.currentTarget.style.borderColor = `${accent}80`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isLeader ? `0 0 20px ${accent}20` : '';
        e.currentTarget.style.borderColor = isLeader ? accent : `${accent}30`;
      }}
    >
      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted flex-shrink-0">
        {isLeader && (
          <div className="absolute top-4 left-4 z-20">
            <div 
              className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-1.5"
              style={{ background: accent, color: 'white' }}
            >
              <Sparkles className="w-3 h-3 fill-white" />
              The Lead
            </div>
          </div>
        )}
        
        {/* Color layer (revealed on hover) */}
        <img
          src={img}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={768}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-110"
        />
        {/* Grayscale layer (default) */}
        <img
          src={img}
          alt={`${name} - ${role}`}
          loading="lazy"
          width={768}
          height={1024}
          className="relative w-full h-full object-cover transition-all duration-700 ease-out grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:opacity-0 group-hover:scale-110"
        />
        {/* Accent color sweep on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
          style={{
            background: `linear-gradient(135deg, ${accent}40 0%, transparent 50%, ${accent}30 100%)`,
          }}
        />
        {/* Bottom fade for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 40%, transparent 70%)`,
          }}
        />
        {/* Accent glow ring on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 60px ${accent}40`,
          }}
        />
        {/* Status dot */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 -mt-2 flex flex-col flex-1">
        {isLeader && (
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-70" style={{ color: accent }}>
            Team Leader
          </span>
        )}
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          {name}
          {isLeader && (
            <div className="relative group/sparkle">
              <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500/20 transition-transform duration-500 group-hover/sparkle:rotate-12" />
              <div className="absolute inset-0 blur-lg bg-yellow-500/40 opacity-0 group-hover/sparkle:opacity-100 transition-opacity pointer-events-none" />
            </div>
          )}
        </h3>
        <p 
          className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 ${isLeader ? 'flex items-center gap-2' : ''}`} 
          style={{ color: accent }}
        >
          {isLeader && <span className="w-4 h-[1px]" style={{ background: accent }} />}
          {role}
        </p>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>
        </div>

        <div className="flex gap-3 pt-3 border-t border-border/50 mt-auto">
          {[
            { Icon: Github, label: 'GitHub', href: links.github },
            { Icon: Linkedin, label: 'LinkedIn', href: links.linkedin },
            { Icon: Twitter, label: 'Twitter', href: links.twitter },
            { Icon: Globe, label: 'Portfolio', href: links.portfolio },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} ${label}`}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110"
              onMouseEnter={(e) => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = ''; }}
              onClick={(e) => e.stopPropagation()}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 text-center">
          <RotatingCharsText text="The Squad" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {team.map((m, i) => (
            <TeamCard key={m.name} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
