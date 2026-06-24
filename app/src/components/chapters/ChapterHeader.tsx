import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ChapterHeaderProps {
  index: number;
  number: string;
  title: string;
  subtitle: string;
  accentColor: string;
  extended?: boolean;
  bgGradient?: boolean;
}

export default function ChapterHeader({
  index,
  number,
  title,
  subtitle,
  accentColor,
  extended = false,
  bgGradient = false,
}: ChapterHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      // Typewriter effect on chapter number
      if (numberRef.current) {
        const fullText = number;
        numberRef.current.textContent = '';
        gsap.to(numberRef.current, {
          duration: fullText.length * 0.05,
          ease: 'none',
          onUpdate: function () {
            const progress = this.progress();
            const charCount = Math.floor(progress * fullText.length);
            if (numberRef.current) {
              numberRef.current.textContent = fullText.slice(0, charCount);
            }
          },
        });
      }

      // Decorative line scale
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: 'power4.inOut',
            delay: 0.2,
            transformOrigin: 'left center',
          }
        );
      }

      // Word-by-word fade up on title
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle fade in
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.8 }
        );
        gsap.to(subtitleRef.current, {
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.8,
        });
      }

      // Pin the header for cinematic effect
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top top',
        end: '+=50vh',
        pin: true,
        pinSpacing: true,
      });
    }, headerRef);

    return () => ctx.revert();
  }, { scope: headerRef });

  const titleWords = title.split(' ').map((word, i) => (
    <span key={i} className="word inline-block" style={{ opacity: 0 }}>
      {word}
      {i < title.split(' ').length - 1 ? '\u00A0' : ''}
    </span>
  ));

  return (
    <div
      ref={headerRef}
      data-chapter-index={index}
      className="relative flex flex-col items-center justify-center"
      style={{
        minHeight: extended ? '120vh' : '100vh',
        backgroundColor: 'var(--black)',
      }}
    >
      {/* Subtle background gradient for epilogue */}
      {bgGradient && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, var(--black) 60%, rgba(255, 23, 68, 0.05) 100%)',
          }}
        />
      )}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/noise-texture.png)',
          backgroundRepeat: 'repeat',
          opacity: 0.03,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-[clamp(1.5rem,5vw,4rem)]">
        {/* Decorative line */}
        <div
          ref={lineRef}
          className="mb-8 h-px w-20"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 12px ${accentColor}80`,
            transform: 'scaleX(0)',
          }}
        />

        {/* Chapter number with typewriter */}
        <span
          ref={numberRef}
          className="mb-6 font-mono text-[clamp(1rem,1.5vw,1.5rem)] font-medium uppercase tracking-[0.05em]"
          style={{ color: accentColor }}
        />

        {/* Chapter title - word by word */}
        <h2
          ref={titleRef}
          className="mb-6 max-w-[800px] font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[1.0] tracking-[-0.02em] text-[var(--white)]"
        >
          {titleWords}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-[600px] font-body text-[clamp(1.125rem,2vw,1.5rem)] font-light italic leading-[1.7] tracking-[0.01em] text-[var(--muted)]"
          style={{ opacity: 0 }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
