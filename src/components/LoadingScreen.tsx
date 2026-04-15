import { useEffect, useRef, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const called = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          if (!called.current) {
            called.current = true;
            setTimeout(() => {
              setHidden(true);
              setTimeout(onComplete, 100);
            }, 500);
          }
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: progress >= 100 ? 'none' : 'auto',
      }}
    >
      <h1 className="font-heading text-3xl md:text-5xl gradient-text mb-8 animate-flicker">
        Silent Thunder Squad
      </h1>
      <div className="w-64 h-0.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, hsl(210 100% 55%), hsl(270 60% 55%))',
            boxShadow: '0 0 20px hsl(210 100% 55% / 0.5)',
          }}
        />
      </div>
      <p className="text-muted-foreground mt-4 text-sm font-light tracking-widest uppercase">
        Initializing
      </p>
    </div>
  );
}
