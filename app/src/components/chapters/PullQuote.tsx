import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface PullQuoteProps {
  text: string;
  accentColor: string;
}

export default function PullQuote({ text, accentColor }: PullQuoteProps) {
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useGSAP(() => {
    if (!quoteRef.current) return;

    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: quoteRef });

  return (
    <div className="mx-auto max-w-[720px] px-[clamp(1.5rem,5vw,4rem)] py-8">
      <blockquote
        ref={quoteRef}
        className="border-l-[3px] pl-6 font-body text-[clamp(1.125rem,2vw,1.5rem)] font-light italic leading-[1.7] tracking-[0.01em] text-[var(--white)]"
        style={{ borderColor: accentColor, opacity: 0 }}
      >
        {text}
      </blockquote>
    </div>
  );
}
