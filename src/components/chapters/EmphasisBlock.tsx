import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface EmphasisBlockProps {
  text: string;
}

export default function EmphasisBlock({ text }: EmphasisBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.emphasis-word');

    words.forEach((word, i) => {
      gsap.fromTo(
        word,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-[720px] px-[clamp(1.5rem,5vw,4rem)] py-16 text-center"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-4">
        {text.split(' ').map((word, i) => (
          <span
            key={i}
            className="emphasis-word font-display text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.01em] text-[var(--white)]"
            style={{ opacity: 0 }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
