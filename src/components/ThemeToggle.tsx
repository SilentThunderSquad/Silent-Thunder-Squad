import { useEffect, useState, useCallback } from 'react';

/* ── Theme persistence ────────────────────────────────────────────── */

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/* ── Component ────────────────────────────────────────────────────── */

/**
 * Premium animated theme toggle — sliding knob with sun/moon,
 * sky-to-night gradient background, clouds & stars.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDark = theme === 'dark';
  // Visual state is INVERTED: show the destination theme, not the current one.
  // Dark mode → show sun/sky (click to go light)
  // Light mode → show moon/night (click to go dark)
  const showDark = !isDark;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed top-5 right-5 z-[90] cursor-pointer group"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* ── Track ── */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '68px',
          height: '32px',
          borderRadius: '16px',
          background: showDark
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1222 100%)'
            : 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 40%, #60a5fa 100%)',
          boxShadow: showDark
            ? '0 2px 16px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 2px 16px rgba(56,189,248,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
          transition: 'background 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s ease',
        }}
      >
        {/* ── Stars (visible in dark) ── */}
        {[
          { x: 14, y: 7, size: 2, delay: 0 },
          { x: 22, y: 18, size: 1.5, delay: 0.15 },
          { x: 10, y: 22, size: 1, delay: 0.3 },
          { x: 30, y: 10, size: 1.5, delay: 0.1 },
          { x: 38, y: 22, size: 2, delay: 0.25 },
          { x: 18, y: 14, size: 1, delay: 0.4 },
          { x: 26, y: 6, size: 1.5, delay: 0.2 },
          { x: 8, y: 12, size: 1, delay: 0.35 },
        ].map((star, i) => (
          <div
            key={`star-${i}`}
            style={{
              position: 'absolute',
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: '50%',
              background: '#fff',
              opacity: showDark ? 1 : 0,
              transform: showDark ? 'scale(1)' : 'scale(0)',
              transition: `opacity 0.4s ease ${star.delay}s, transform 0.4s ease ${star.delay}s`,
              boxShadow: '0 0 3px rgba(255,255,255,0.8)',
            }}
          />
        ))}

        {/* ── Twinkling star (animated) ── */}
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '8px',
            width: '2.5px',
            height: '2.5px',
            borderRadius: '50%',
            background: '#fef08a',
            opacity: showDark ? 1 : 0,
            transition: 'opacity 0.4s ease 0.3s',
            boxShadow: '0 0 6px 1px rgba(254,240,138,0.6)',
            animation: showDark ? 'twinkle 2s ease-in-out infinite' : 'none',
          }}
        />

        {/* ── Clouds (visible in light) ── */}
        {/* Cloud 1 — left side */}
        <div
          style={{
            position: 'absolute',
            left: '8px',
            top: '16px',
            opacity: showDark ? 0 : 0.9,
            transform: showDark ? 'translateX(-8px) scale(0.7)' : 'translateX(0) scale(1)',
            transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <ellipse cx="9" cy="6.5" rx="9" ry="3.5" fill="white" opacity="0.8" />
            <ellipse cx="6" cy="4" rx="5" ry="4" fill="white" opacity="0.9" />
            <ellipse cx="12" cy="4.5" rx="4" ry="3.5" fill="white" opacity="0.85" />
          </svg>
        </div>
        {/* Cloud 2 — center */}
        <div
          style={{
            position: 'absolute',
            left: '22px',
            top: '20px',
            opacity: showDark ? 0 : 0.7,
            transform: showDark ? 'translateX(-6px) scale(0.6)' : 'translateX(0) scale(1)',
            transition: 'opacity 0.3s ease 0.1s, transform 0.45s cubic-bezier(0.4,0,0.2,1) 0.05s',
          }}
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <ellipse cx="7" cy="5" rx="7" ry="3" fill="white" opacity="0.75" />
            <ellipse cx="5" cy="3" rx="4" ry="3" fill="white" opacity="0.85" />
            <ellipse cx="9" cy="3.5" rx="3.5" ry="2.5" fill="white" opacity="0.8" />
          </svg>
        </div>

        {/* ── Knob ── */}
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: showDark ? '39px' : '3px',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: showDark
              ? 'linear-gradient(135deg, #e2e8f0, #cbd5e1)'
              : 'linear-gradient(135deg, #fef08a, #fbbf24)',
            boxShadow: showDark
              ? '0 2px 8px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)'
              : '0 2px 12px rgba(251,191,36,0.4), inset 0 -2px 4px rgba(0,0,0,0.05)',
            transition: 'left 0.45s cubic-bezier(0.68,-0.6,0.32,1.6), background 0.4s ease, box-shadow 0.4s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Sun face */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: showDark ? 0 : 1,
              transform: showDark ? 'rotate(-90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
              transition: 'opacity 0.3s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              {/* Rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="12"
                  y1="1"
                  x2="12"
                  y2="4"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 12 12)`}
                />
              ))}
              <circle cx="12" cy="12" r="5" fill="#f59e0b" />
            </svg>
          </div>

          {/* Moon face */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: showDark ? 1 : 0,
              transform: showDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.5)',
              transition: 'opacity 0.3s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="#94a3b8"
                stroke="#64748b"
                strokeWidth="0.5"
              />
              {/* Moon craters */}
              <circle cx="14" cy="10" r="1.5" fill="#7c8ba1" opacity="0.4" />
              <circle cx="10" cy="15" r="1" fill="#7c8ba1" opacity="0.3" />
              <circle cx="16" cy="15" r="0.7" fill="#7c8ba1" opacity="0.25" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Hover ring ── */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          borderRadius: '16px',
          boxShadow: showDark
            ? '0 0 0 2px rgba(139,92,246,0.3), 0 0 20px rgba(139,92,246,0.15)'
            : '0 0 0 2px rgba(56,189,248,0.3), 0 0 20px rgba(56,189,248,0.15)',
          transition: 'box-shadow 0.4s ease, opacity 0.3s ease',
        }}
      />

      {/* ── Twinkle keyframe ── */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.6); }
        }
      `}</style>
    </button>
  );
}
