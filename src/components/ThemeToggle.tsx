import { useEffect, useState, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Reads the saved theme from localStorage, falling back to system preference.
 * Returns 'dark' or 'light'.
 */
function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Premium sun/moon toggle with smooth icon rotation transition.
 * Persists preference to localStorage and toggles `dark` class on <html>.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  // Apply theme class to <html>
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

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed top-5 right-5 z-[90] w-11 h-11 rounded-full glass-strong flex items-center justify-center group cursor-pointer"
      style={{
        boxShadow: isDark
          ? '0 4px 24px hsl(217 91% 60% / 0.25), 0 0 0 1px hsl(224 20% 20% / 0.5)'
          : '0 4px 24px hsl(221 83% 53% / 0.15), 0 0 0 1px hsl(220 25% 85% / 0.5)',
        transition: 'box-shadow 0.4s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
      }}
    >
      <div
        className="relative w-5 h-5"
        style={{
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        {/* Sun icon — visible in dark mode (click to go light) */}
        <Sun
          className="absolute inset-0 w-5 h-5 text-amber-400 transition-all duration-500"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-90deg)',
          }}
        />
        {/* Moon icon — visible in light mode (click to go dark) */}
        <Moon
          className="absolute inset-0 w-5 h-5 text-indigo-500 transition-all duration-500"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'scale(0.5) rotate(90deg)' : 'scale(1) rotate(0deg)',
          }}
        />
      </div>
    </button>
  );
}
