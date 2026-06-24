import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollButtonProps {
  accentColor?: string;
}

export default function ScrollButton({ accentColor = 'var(--cyan)' }: ScrollButtonProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Track if we're near the bottom
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Hide button when within 100px of bottom
      setIsVisible(scrollTop + clientHeight < scrollHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollDown = () => {
    // Scroll down by 80% of viewport height
    const scrollAmount = window.innerHeight * 0.8;
    window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollDown}
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 flex flex-col items-center gap-2 rounded-full border border-[var(--dim)] bg-[rgba(0,0,0,0.6)] px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[var(--white)] hover:bg-[rgba(0,0,0,0.8)] lg:bottom-8"
      aria-label="Desplazarse hacia abajo"
    >
      <div
        className="animate-bounce"
        style={{ color: accentColor }}
      >
        <ArrowDown size={24} />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
        siguiente
      </span>
    </button>
  );
}
