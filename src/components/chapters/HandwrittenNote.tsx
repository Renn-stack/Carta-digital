import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface HandwrittenNoteProps {
  text: string;
  accentColor: string;
  offset?: 'left' | 'right';
  rotation?: number;
  delay?: number;
  large?: boolean;
}

export default function HandwrittenNote({
  text,
  accentColor,
  offset = 'right',
  rotation = 2,
  delay = 0,
  large = false,
}: HandwrittenNoteProps) {
  const noteRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!noteRef.current) return;

    // Entrance: Handwritten Note Reveal
    gsap.fromTo(
      noteRef.current,
      { opacity: 0, rotate: -5, scale: 0.9 },
      {
        opacity: 1,
        rotate: rotation,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
        delay,
        scrollTrigger: {
          trigger: noteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Continuous subtle float
    gsap.to(noteRef.current, {
      y: 5,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.7 + delay,
    });
  }, { scope: noteRef });

  const marginClass = offset === 'right' ? 'ml-[20%]' : 'mr-[20%] text-right';

  return (
    <div
      ref={noteRef}
      className={`mx-auto max-w-[720px] px-[clamp(1.5rem,5vw,4rem)] ${marginClass}`}
      style={{ opacity: 0 }}
    >
      <span
        className={`font-handwritten ${large ? 'text-[clamp(2rem,5vw,4rem)]' : 'text-[clamp(1.25rem,2.5vw,2rem)]'} leading-[1.3]`}
        style={{ color: accentColor }}
      >
        {text}
      </span>
    </div>
  );
}
