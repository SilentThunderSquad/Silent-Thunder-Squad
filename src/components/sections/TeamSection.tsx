import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { RotatingCharsText } from '../StorytellingTypography';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: 'Alex Chen', role: 'Lead Developer', desc: 'Full-stack architect with a passion for scalable systems.' },
  { name: 'Maya Patel', role: 'UX Designer', desc: 'Crafting human-centered experiences that delight and inspire.' },
  { name: 'Jordan Lee', role: 'AI Engineer', desc: 'Building intelligent systems that understand the world.' },
  { name: 'Sam Torres', role: 'DevOps Lead', desc: 'Orchestrating cloud infrastructure for maximum resilience.' },
  { name: 'Riley Kim', role: 'Mobile Developer', desc: 'Creating seamless cross-platform mobile experiences.' },
  { name: 'Casey Wright', role: 'Security Analyst', desc: 'Defending digital frontiers with vigilance and expertise.' },
];

function TeamCard({ name, role, desc, index }: { name: string; role: string; desc: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.6, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 90%' },
      }
    );
    // Animate name chars
    if (nameRef.current) {
      const split = new SplitType(nameRef.current, { types: 'chars' });
      if (split.chars) {
        gsap.set(split.chars, { opacity: 0, y: 15, rotateY: 45 });
        gsap.to(split.chars, {
          opacity: 1, y: 0, rotateY: 0, duration: 0.4, stagger: 0.03, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%' },
        });
      }
    }
    // Animate role words
    if (roleRef.current) {
      const split = new SplitType(roleRef.current, { types: 'words' });
      if (split.words) {
        gsap.set(split.words, { opacity: 0, x: -10 });
        gsap.to(split.words, {
          opacity: 1, x: 0, duration: 0.4, stagger: 0.05, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%' },
        });
      }
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="glass rounded-xl p-6 group cursor-pointer transition-all duration-300 hover:neon-glow-purple text-center"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 15;
        const y = -(e.clientY - rect.top - rect.height / 2) / 15;
        e.currentTarget.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
      }}
    >
      <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-heading font-bold"
        style={{
          background: 'linear-gradient(135deg, hsl(210 100% 55% / 0.15), hsl(270 60% 55% / 0.15))',
          border: '1px solid hsl(210 100% 55% / 0.2)',
        }}>
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 ref={nameRef} className="font-heading text-lg font-semibold text-foreground mb-1" style={{ perspective: '400px' }}>{name}</h3>
      <p ref={roleRef} className="text-primary text-sm font-medium mb-3">{role}</p>
      <p className="text-muted-foreground text-sm">{desc}</p>
      <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {['𝕏', 'in', '◉'].map((icon, i) => (
          <span key={i} className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors">
            {icon}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <RotatingCharsText text="The Squad" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <TeamCard key={m.name} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
