import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotatingCharsText } from '../StorytellingTypography';
import { AmbientDots } from '../StorytellingElements';
import { useScrollReveal, prefersReducedMotion } from '@/hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Web Development', desc: 'Modern, performant web applications built with cutting-edge frameworks and technologies.', icon: '⚡' },
  { title: 'AI & Machine Learning', desc: 'Intelligent solutions powered by advanced algorithms and neural architectures.', icon: '🧠' },
  { title: 'UI/UX Design', desc: 'Human-centered design that bridges aesthetic beauty with intuitive functionality.', icon: '🎨' },
  { title: 'Cloud Architecture', desc: 'Scalable, resilient cloud infrastructure engineered for the demands of tomorrow.', icon: '☁️' },
  { title: 'Mobile Apps', desc: 'Cross-platform mobile experiences that feel native and perform flawlessly.', icon: '📱' },
  { title: 'Cybersecurity', desc: 'Fortified digital defenses protecting assets in an ever-evolving threat landscape.', icon: '🛡️' },
];

function ServiceCard({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  const reduced = prefersReducedMotion();

  return (
    <div
      className="service-card glass hover-lift rounded-xl p-8 group cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 14;
        const y = -(e.clientY - rect.top - rect.height / 2) / 14;
        e.currentTarget.style.transform = `perspective(800px) translateY(-6px) rotateY(${x}deg) rotateX(${y}deg)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
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
  const gridRef = useScrollReveal<HTMLDivElement>({
    selector: '.service-card',
    from: 'bottom',
    stagger: 0.1,
    duration: 0.8,
  });

  return (
    <section id="services" aria-label="Web development services offered by Silent Thunder Squad" className="py-32 px-6 relative">
      <AmbientDots />
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <RotatingCharsText text="What We Do" />
        </div>
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
