import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Web Development', desc: 'Modern, performant web applications built with cutting-edge frameworks and technologies.', icon: '⚡' },
  { title: 'AI & Machine Learning', desc: 'Intelligent solutions powered by advanced algorithms and neural architectures.', icon: '🧠' },
  { title: 'UI/UX Design', desc: 'Human-centered design that bridges aesthetic beauty with intuitive functionality.', icon: '🎨' },
  { title: 'Cloud Architecture', desc: 'Scalable, resilient cloud infrastructure engineered for the demands of tomorrow.', icon: '☁️' },
  { title: 'Mobile Apps', desc: 'Cross-platform mobile experiences that feel native and perform flawlessly.', icon: '📱' },
  { title: 'Cybersecurity', desc: 'Fortified digital defenses protecting assets in an ever-evolving threat landscape.', icon: '🛡️' },
];

function ServiceCard({ title, desc, icon, index }: { title: string; desc: string; icon: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 90%' },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="glass rounded-xl p-8 group cursor-pointer transition-all duration-300 hover:neon-glow"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 10;
        const y = -(e.clientY - rect.top - rect.height / 2) / 10;
        e.currentTarget.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
      }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:neon-text transition-all">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function ServicesSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const split = new SplitType(headingRef.current, { types: 'chars' });
      if (split.chars) {
        gsap.set(split.chars, { opacity: 0, y: 40 });
        gsap.to(split.chars, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.02, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        });
      }
    }
  }, []);

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="font-heading text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          What We Do
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
