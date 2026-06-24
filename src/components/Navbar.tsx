import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export default function Navbar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hidden on cover page (/), shows on all other pages
    if (location.pathname === '/') {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <nav className="sticky top-0 z-50 w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-[clamp(1.5rem,5vw,4rem)] py-4">
        <Link
          to="/"
          className="font-display text-sm font-bold uppercase tracking-[-0.02em] text-[var(--white)] transition-opacity hover:opacity-70"
        >
          UNINAMUS
        </Link>
        <div className="flex items-center gap-8">
          <Link
            to="/carta"
            className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted)] transition-colors hover:text-[var(--white)]"
          >
            Carta
          </Link>
          <Link
            to="/dedicatoria"
            className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted)] transition-colors hover:text-[var(--white)]"
          >
            Dedicatoria
          </Link>
        </div>
      </div>
    </nav>
  );
}
