import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  title: string;
  body: string;
}

interface AdmirationCardsProps {
  cards: Card[];
}

export default function AdmirationCards({ cards }: AdmirationCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cardEls = containerRef.current.querySelectorAll('.admiration-card');

    cardEls.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
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
      className="mx-auto flex max-w-[400px] flex-col gap-8 px-[clamp(1.5rem,5vw,4rem)] py-12"
    >
      {cards.map((card, i) => (
        <div
          key={i}
          className="admiration-card rounded-lg p-6"
          style={{
            backgroundColor: 'var(--charcoal)',
            border: '1px solid rgba(255, 213, 79, 0.15)',
            opacity: 0,
          }}
        >
          <h4
            className="mb-3 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.08em]"
            style={{ color: 'var(--gold)' }}
          >
            {card.title}
          </h4>
          <p
            className="font-body text-[0.9375rem] font-normal leading-[1.6] tracking-[0.02em]"
            style={{ color: 'var(--light-gray)' }}
          >
            {card.body}
          </p>
        </div>
      ))}
    </div>
  );
}
