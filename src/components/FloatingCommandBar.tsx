import { useEffect, useRef, useState } from 'react';
import { Home, User, Briefcase, FolderKanban, Users, Mail } from 'lucide-react';

const items = [
  { id: 'top', label: 'Home', Icon: Home },
  { id: 'about', label: 'About', Icon: User },
  { id: 'services', label: 'Services', Icon: Briefcase },
  { id: 'projects', label: 'Projects', Icon: FolderKanban },
  { id: 'team', label: 'Team', Icon: Users },
  { id: 'cta', label: 'Contact', Icon: Mail },
];

export default function FloatingCommandBar() {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={barRef}
      aria-hidden={!visible}
      className={`fixed left-1/2 -translate-x-1/2 z-[80] transition-all duration-500 ease-out ${
        visible ? 'bottom-6 opacity-100 translate-y-0 pointer-events-auto' : 'bottom-2 opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <nav
        aria-label="Quick navigation"
        className="glass-strong rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl"
        style={{
          boxShadow: '0 20px 60px -20px hsl(var(--primary) / 0.35), 0 0 0 1px hsl(var(--glass-border) / 0.5)',
        }}
      >
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={label}
            className="group relative w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2))',
                boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
              }}
            />
            <Icon className="relative w-4 h-4" />
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-medium glass opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
