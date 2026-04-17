import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { RotatingCharsText } from '../StorytellingTypography';
import vivekImg from '@/assets/team-vivek.jpg';
import omImg from '@/assets/team-om.jpg';
import anujImg from '@/assets/team-anuj.jpg';
import navImg from '@/assets/team-nav.jpg';
import rajitImg from '@/assets/team-rajit.jpg';
import priyanshuImg from '@/assets/team-priyanshu.jpg';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: 'Vivek Kumar Verma', role: 'Team Leader', desc: 'Full-stack architect with a passion for scalable systems.', img: vivekImg, accent: 'hsl(210 100% 55%)' },
  { name: 'Om Singh', role: 'UX Designer', desc: 'Crafting human-centered experiences that delight and inspire.', img: omImg, accent: 'hsl(270 70% 60%)' },
  { name: 'Anuj Vashishth', role: 'AI Engineer', desc: 'Building intelligent systems that understand the world.', img: anujImg, accent: 'hsl(190 100% 55%)' },
  { name: 'Nav Sharma', role: 'DevOps Lead', desc: 'Orchestrating cloud infrastructure for maximum resilience.', img: navImg, accent: 'hsl(150 80% 50%)' },
  { name: 'Rajit Shikharwar', role: 'Mobile Developer', desc: 'Creating seamless cross-platform mobile experiences.', img: rajitImg, accent: 'hsl(25 95% 55%)' },
  { name: 'Priyanshu Varshney', role: 'Security Analyst', desc: 'Defending digital frontiers with vigilance and expertise.', img: priyanshuImg, accent: 'hsl(0 80% 60%)' },
];

function TeamCard({ name, role, desc, img, accent, index }: { name: string; role: string; desc: string; img: string; accent: string; index: number }) {
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
      className="glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2"
      style={{
        border: `1px solid ${accent}30`,
        boxShadow: `0 0 0 0 ${accent}00`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 60px -15px ${accent}50`;
        e.currentTarget.style.borderColor = `${accent}80`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 0 ${accent}00`;
        e.currentTarget.style.borderColor = `${accent}30`;
      }}
    >
      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={img}
          alt={`${name} - ${role}`}
          loading="lazy"
          width={768}
          height={1024}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 40%, transparent 70%)`,
          }}
        />
        {/* Status dot */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 -mt-2">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-1">{name}</h3>
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: accent }}>
          {role}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>

        <div className="flex gap-3 pt-3 border-t border-border/50">
          {[
            { Icon: Github, label: 'GitHub' },
            { Icon: Linkedin, label: 'LinkedIn' },
            { Icon: Twitter, label: 'Twitter' },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={`${name} ${label}`}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110"
              onMouseEnter={(e) => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = ''; }}
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
