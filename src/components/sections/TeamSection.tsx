import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
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
    links: { github: 'https://github.com/vivekverma807', linkedin: 'https://linkedin.com/in/vivekverma807', twitter: 'https://x.com/vivekverma807', portfolio: 'https://vivek.silentthundersquad.in' },
  },
  {
    name: 'Om Singh',
    role: 'Backend & ML Engineer',
    desc: 'Specializing in robust backend systems and machine learning models that power intelligent, data-driven applications.',
    img: omImg,
    accent: 'hsl(270 70% 60%)',
    links: { github: 'https://github.com/om-singhhh', linkedin: 'https://linkedin.com/in/om-singh-engineer', twitter: 'https://x.com/omsingh', portfolio: 'https://om.dev' },
  },
  {
    name: 'Anuj Vashishth',
    role: 'Frontend Developer & Data Entry',
    desc: 'Designing responsive, fluid frontend interfaces while ensuring data integrity and precision through meticulous management.',
    img: anujImg,
    accent: 'hsl(190 100% 55%)',
    links: { github: 'https://github.com/anujvashishth', linkedin: 'https://linkedin.com/in/anuj-vashishtha-b16667296', portfolio: 'https://anuj.silentthundersquad.in' },
  },
  {
    name: 'Nav Sharma',
    role: 'UI/UX Designer & Data Analyst',
    desc: 'Merging creative UI/UX artistry with analytical data precision to build interfaces that are as functional as they are beautiful.',
    img: navImg,
    accent: 'hsl(150 80% 50%)',
    links: { github: 'https://github.com/navsharma15', linkedin: 'https://linkedin.com/in/nav-sharma', portfolio: 'https://nav.silentthundersquad.in' },
  },
  {
    name: 'Rajit Shikharwar',
    role: 'Data Analyst & Cloud DBA',
    desc: 'Expertly handling complex cloud database architectures and translating raw data into actionable strategic intelligence.',
    img: rajitImg,
    accent: 'hsl(25 95% 55%)',
    links: { github: 'https://github.com/rajit-sikharwar', linkedin: 'https://linkedin.com/in/rajit-sikharwar/', twitter: 'https://x.com/rajit8279', portfolio: 'https://rajit.silentthundersquad.in' },
  },
  {
    name: 'Priyanshu Varshney',
    role: 'Backend & Java Developer',
    desc: 'Crafting scalable, high-concurrency backend solutions and enterprise-grade applications within the Java ecosystem.',
    img: priyanshuImg,
    accent: 'hsl(0 80% 60%)',
    links: { github: 'https://github.com/dev-priyanshu5191', linkedin: 'https://linkedin.com/in/priyanshu5191', twitter: 'https://x.com/priyanshu5191', portfolio: 'https://priyanshu.silentthundersquad.in' },
  },
];

type TeamMember = (typeof team)[number];

interface TeamCardProps extends TeamMember {
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}

function TeamCard({ name, role, desc, img, accent, index, links, isLeader, hoveredIndex, setHoveredIndex }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isAnyHovered = hoveredIndex !== null;
  const isThisHovered = hoveredIndex === index;
  const shouldDim = isAnyHovered && !isThisHovered;

  // Scroll-triggered entrance + content reveal
  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      // Split text
      const nameSplit = nameRef.current ? new SplitType(nameRef.current, { types: 'words' }) : null;
      const roleSplit = roleRef.current ? new SplitType(roleRef.current, { types: 'words' }) : null;

      // Initial states
      if (nameSplit?.words) gsap.set(nameSplit.words, { x: -30, opacity: 0 });
      if (roleSplit?.words) gsap.set(roleSplit.words, { x: 30, opacity: 0 });
      if (descRef.current) gsap.set(descRef.current, { y: 20, opacity: 0 });

      // Card entrance — leader gets stronger emphasis & comes first
      const baseDelay = isLeader ? 0 : 0.15 + index * 0.08;
      const initY = isLeader ? 80 : 60;
      const initScale = isLeader ? 0.92 : 0.96;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%', toggleActions: 'play none none none' },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: initY, scale: initScale },
        { opacity: 1, y: 0, scale: 1, duration: isLeader ? 1 : 0.75, delay: baseDelay, ease: 'power3.out' }
      );

      if (nameSplit?.words) tl.to(nameSplit.words, { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' }, '-=0.4');
      if (roleSplit?.words) tl.to(roleSplit.words, { x: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power3.out' }, '-=0.35');
      if (descRef.current) tl.to(descRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');

      // Leader pulse glow once on load
      if (isLeader && cardRef.current) {
        gsap.to(cardRef.current, {
          boxShadow: `0 0 50px ${accent}80, 0 0 90px ${accent}40`,
          duration: 1.1,
          repeat: 3,
          yoyo: true,
          ease: 'sine.inOut',
          delay: baseDelay + 0.6,
          onComplete: () => {
            if (cardRef.current && hoveredIndex !== index) {
              gsap.to(cardRef.current, { boxShadow: `0 0 22px ${accent}33`, duration: 0.6 });
            }
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index, isLeader, accent]);

  // 3D tilt — disabled on mobile
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !innerRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(innerRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.6,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
    if (scanRef.current) {
      gsap.to(scanRef.current, {
        '--mx': `${(x + 0.5) * 100}%`,
        '--my': `${(y + 0.5) * 100}%`,
        duration: 0.4,
        ease: 'power2.out',
      } as gsap.TweenVars);
    }
  };

  const handleMouseEnter = () => {
    setHoveredIndex(index);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: isLeader ? 1.05 : 1.03,
        boxShadow: `0 30px 70px -20px ${accent}66, 0 0 0 1px ${accent}, 0 0 50px ${accent}55`,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (innerRef.current) {
      gsap.to(innerRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' });
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        boxShadow: isLeader ? `0 0 22px ${accent}33` : '0 0 0px transparent',
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="team-card-wrap relative h-full opacity-0"
      style={{
        transition: 'filter 0.5s ease, opacity 0.5s ease',
        filter: shouldDim ? 'blur(2px) brightness(0.6)' : 'none',
        opacity: shouldDim ? 0.55 : 1,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerRef}
        className="glass rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer relative"
        style={{
          border: `1px solid ${isLeader ? accent : accent + '30'}`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
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
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out opacity-0 scale-105 group-hover:opacity-100"
            style={{ opacity: isThisHovered ? 1 : 0, transform: `scale(${isThisHovered ? 1.1 : 1.05})` }}
          />
          {/* Grayscale + slight blur (default) */}
          <img
            src={img}
            alt={`${name} - ${role}`}
            loading="lazy"
            width={768}
            height={1024}
            className="relative w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              filter: isThisHovered ? 'grayscale(0) blur(0px) contrast(1.05)' : 'grayscale(1) blur(1px) contrast(1.05)',
              opacity: isThisHovered ? 0 : 1,
              transform: `scale(${isThisHovered ? 1.1 : 1})`,
            }}
          />

          {/* Accent color sweep on hover */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-500"
            style={{
              opacity: isThisHovered ? 1 : 0,
              background: `linear-gradient(135deg, ${accent}40 0%, transparent 50%, ${accent}30 100%)`,
            }}
          />

          {/* Scan line effect */}
          <div
            ref={scanRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={
              {
                opacity: isThisHovered ? 1 : 0,
                background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), ${accent}55 0%, transparent 35%)`,
                mixBlendMode: 'screen',
                ['--mx' as string]: '50%',
                ['--my' as string]: '50%',
              } as React.CSSProperties
            }
          />
          {/* Animated horizontal scan band */}
          <div
            className="absolute inset-x-0 h-[2px] pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              opacity: isThisHovered ? 0.9 : 0,
              top: isThisHovered ? '100%' : '0%',
              transition: 'top 1.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
              boxShadow: `0 0 12px ${accent}`,
            }}
          />

          {/* Bottom fade for text legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 40%, transparent 70%)` }}
          />

          {/* Accent glow ring on hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{ opacity: isThisHovered ? 1 : 0, boxShadow: `inset 0 0 60px ${accent}40` }}
          />

          {/* Status dot */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 -mt-2 flex flex-col flex-1 relative z-10">
          {isLeader && (
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-70" style={{ color: accent }}>
              Team Leader
            </span>
          )}
          <h3 ref={nameRef} className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-1 flex items-center gap-2 flex-wrap">
            {name}
            {isLeader && (
              <span className="relative inline-flex">
                <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
                <span className="absolute inset-0 blur-lg bg-yellow-500/40 opacity-60 pointer-events-none" />
              </span>
            )}
          </h3>
          <p
            ref={roleRef}
            className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 ${isLeader ? 'flex items-center gap-2' : ''}`}
            style={{ color: accent }}
          >
            {isLeader && <span className="w-4 h-[1px]" style={{ background: accent }} />}
            {role}
          </p>
          <div className="flex-1">
            <p ref={descRef} className="text-muted-foreground text-sm leading-relaxed mb-4">
              {desc}
            </p>
          </div>

          <div className="flex gap-3 pt-3 border-t border-border/50 mt-auto">
            {[
              { Icon: Github, label: 'GitHub', href: links.github },
              { Icon: Linkedin, label: 'LinkedIn', href: links.linkedin },
              { Icon: Twitter, label: 'Twitter', href: links.twitter },
              { Icon: Globe, label: 'Portfolio', href: links.portfolio },
            ]
              .filter((l) => l.href)
              .map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} ${label}`}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = accent;
                    e.currentTarget.style.borderColor = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 text-center">
          <RotatingCharsText text="The Squad" />
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          style={{ perspective: '1200px' }}
        >
          {team.map((m, i) => (
            <TeamCard key={m.name} {...m} index={i} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
