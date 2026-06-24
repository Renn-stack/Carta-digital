import type { ReactNode } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ProseBlockProps {
  paragraphs: string[];
  highlightWords?: Record<number, string[]>; // paragraph index -> words to highlight
  accentColor?: string;
}

export default function ProseBlock({
  paragraphs,
  highlightWords = {},
  accentColor = 'var(--cyan)',
}: ProseBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const paragraphEls = containerRef.current.querySelectorAll('.prose-paragraph');

    paragraphEls.forEach((p) => {
      gsap.fromTo(
        p,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: containerRef });

  const renderParagraph = (text: string, pIndex: number) => {
    const wordsToHighlight = highlightWords[pIndex] || [];
    if (wordsToHighlight.length === 0) {
      return <p className="prose-paragraph" style={{ opacity: 0 }}>{text}</p>;
    }

    // Split text and highlight specific words in Caveat font
    const parts: (string | ReactNode)[] = [];
    let remaining = text;
    let keyCounter = 0;

    wordsToHighlight.forEach((word) => {
      const idx = remaining.indexOf(word);
      if (idx !== -1) {
        if (idx > 0) {
          parts.push(remaining.slice(0, idx));
        }
        parts.push(
          <span
            key={`${pIndex}-hl-${keyCounter++}`}
            className="font-handwritten"
            style={{ color: accentColor, fontSize: '1.2em', lineHeight: '1' }}
          >
            {word}
          </span>
        );
        remaining = remaining.slice(idx + word.length);
      }
    });
    if (remaining) {
      parts.push(remaining);
    }

    return <p className="prose-paragraph" style={{ opacity: 0 }}>{parts}</p>;
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-[720px] px-[clamp(1.5rem,5vw,4rem)] py-[12rem]"
    >
      {paragraphs.map((text, i) => (
        <div key={i} className={i > 0 ? 'mt-16' : ''}>
          {renderParagraph(text, i)}
        </div>
      ))}

      <style>{`
        .prose-paragraph {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          font-weight: 300;
          line-height: 1.8;
          letter-spacing: 0.01em;
          color: var(--light-gray);
        }
      `}</style>
    </div>
  );
}
