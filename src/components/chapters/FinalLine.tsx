import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface FinalLineProps {
  lines: string[];
}

export default function FinalLine({ lines }: FinalLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Staggered entrance for each line
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    linesRef.current.forEach((line, i) => {
      if (!line) return;
      tl.fromTo(
        line,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        i * 0.4
      );
    });

    // Glow pulse after all lines appear
    tl.to(
      containerRef.current,
      {
        textShadow: '0 0 20px rgba(255, 23, 68, 0.2)',
        duration: 1,
        ease: 'power2.out',
      },
      '>'
    );
    tl.to(
      containerRef.current,
      {
        textShadow: '0 0 0px rgba(255, 23, 68, 0)',
        duration: 1,
        ease: 'power2.in',
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-[800px] px-[clamp(1.5rem,5vw,4rem)] py-24 text-center"
      style={{ opacity: 1 }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          ref={(el) => { linesRef.current[i] = el; }}
          className="font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.4] tracking-[-0.02em]"
          style={{
            opacity: 0,
            background: 'linear-gradient(to bottom, var(--crimson), var(--rose))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
