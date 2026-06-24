import { useRef, useState, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { LenisContext } from '@/components/LenisProvider';

gsap.registerPlugin(ScrollTrigger);

interface ChapterNavProps {
  chapterCount: number;
  accentColors: string[];
}

const chapterLabels = [
  '00', '01', '02', '03', '04', '05', '06', '07',
  '08', '09', '10', '11', '12', '13',
];

export default function ChapterNav({ chapterCount, accentColors }: ChapterNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lenis = useContext(LenisContext);

  useGSAP(() => {
    if (!navRef.current) return;

    // Fade in nav after page load
    gsap.fromTo(
      navRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
    );

    // Track active chapter based on scroll
    const chapters = document.querySelectorAll('[data-chapter-index]');
    chapters.forEach((chapter, index) => {
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    // Progress line tied to overall scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.height = `${self.progress * 100}%`;
        }
      },
    });
  }, { scope: navRef });

  const scrollToChapter = (index: number) => {
    const chapter = document.querySelector(`[data-chapter-index="${index}"]`);
    if (chapter && lenis) {
      lenis.scrollTo(chapter, { immediate: false });
    }
  };

  return (
    <div
      ref={navRef}
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      style={{ opacity: 0 }}
    >
      {/* Progress track */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--dim)] opacity-40">
        <div
          ref={progressRef}
          className="w-full transition-colors duration-300"
          style={{ backgroundColor: accentColors[activeIndex] || 'var(--cyan)', height: '0%' }}
        />
      </div>

      {/* Dots */}
      <div className="relative flex flex-col gap-4">
        {Array.from({ length: chapterCount }).map((_, i) => {
          const isActive = i === activeIndex;
          const color = accentColors[i] || 'var(--cyan)';
          return (
            <button
              key={i}
              onClick={() => scrollToChapter(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex h-4 w-4 items-center justify-center"
              aria-label={`Capítulo ${chapterLabels[i]}`}
            >
              {/* Dot */}
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? '10px' : '5px',
                  height: isActive ? '10px' : '5px',
                  backgroundColor: isActive ? color : 'var(--dim)',
                  opacity: isActive ? 1 : 0.4,
                  boxShadow: isActive ? `0 0 12px ${color}80` : 'none',
                }}
              />
              {/* Label on hover */}
              {hoveredIndex === i && (
                <span
                  className="absolute left-6 whitespace-nowrap font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)]"
                  style={{ opacity: 0.8 }}
                >
                  {chapterLabels[i]}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
