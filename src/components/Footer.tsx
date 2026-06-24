import { useLocation } from 'react-router';

export default function Footer() {
  const location = useLocation();

  // Determine accent color based on current route
  const accentColor = location.pathname === '/dedicatoria'
    ? 'var(--crimson)'
    : location.pathname === '/carta'
      ? 'var(--cyan)'
      : 'var(--cyan)';

  return (
    <footer className="w-full py-16 text-center">
    </footer>
  );
}
