import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CuboMisterioso() {
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: imageRef });

  return (
    <div
      ref={imageRef}
      className="mx-auto max-w-[400px] px-[clamp(1.5rem,5vw,4rem)] py-12"
      style={{ opacity: 0 }}
    >
      <img
        src="/cubo-misterioso.png"
        alt="Cubo misterioso"
        className="h-auto w-full rounded-2xl"
        style={{
          boxShadow: '0 0 40px rgba(255, 64, 129, 0.15)',
        }}
        loading="lazy"
      />
    </div>
  );
}
