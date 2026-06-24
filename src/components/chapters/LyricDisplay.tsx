import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface LyricPair {
  spanish: string;
  english: string;
}

interface LyricDisplayProps {
  pairs: LyricPair[];
  accentColor: string;
}

export default function LyricDisplay({ pairs, accentColor }: LyricDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const pairEls = containerRef.current.querySelectorAll('.lyric-pair');

    pairEls.forEach((pair) => {
      const spanishLine = pair.querySelector('.spanish-line');
      const englishLine = pair.querySelector('.english-line');

      gsap.fromTo(
        spanishLine,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pair,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        englishLine,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: pair,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-[800px] px-[clamp(1.5rem,5vw,4rem)] py-16"
    >
      {/* Musical note */}
      <div className="mb-8 text-center">
        <span style={{ color: accentColor, fontSize: '1.5rem' }}>&#9836;</span>
      </div>

      <div className="flex flex-col gap-16">
        {pairs.map((pair, i) => (
          <div key={i} className="lyric-pair flex flex-col gap-4 text-center">
            <p
              className="spanish-line font-handwritten text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.3]"
              style={{ color: accentColor, opacity: 0 }}
            >
              {pair.spanish}
            </p>
            <p
              className="english-line font-body text-[clamp(1.125rem,2vw,1.5rem)] font-light italic leading-[1.7] tracking-[0.01em]"
              style={{ color: 'var(--muted)', opacity: 0 }}
            >
              {pair.english}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
