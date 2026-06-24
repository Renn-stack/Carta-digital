import { useEffect, useRef, useState, useCallback } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';

/*
 * GlitchLetter
 * Individual letter with chromatic aberration glitch effect
 */
function GlitchLetter({
  letter,
  index,
}: {
  letter: string;
  index: number;
}) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const redRef = useRef<HTMLSpanElement>(null);
  const cyanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = letterRef.current;
    const red = redRef.current;
    const cyan = cyanRef.current;
    if (!el || !red || !cyan) return;

    const isSpace = letter === ' ';
    if (isSpace) return;

    // Initial state: hidden
    gsap.set([el, red, cyan], { opacity: 0 });

    // Step 2 — Glitch reveal with stagger (400ms base delay + 40ms per char)
    const tl = gsap.timeline({ delay: 0.4 + index * 0.04 });

    // Chromatic aberration flash: red and cyan offsets visible first
    tl.set([red, cyan], { opacity: 1 }, 0);
    tl.set(el, { opacity: 0 }, 0);

    // Brief offset (red shift left, cyan shift right)
    tl.to(red, { x: -3, duration: 0.04, ease: 'none' }, 0);
    tl.to(cyan, { x: 3, duration: 0.04, ease: 'none' }, 0);

    // Resolve to centered white letter
    tl.to(red, { x: 0, opacity: 0, duration: 0.04, ease: 'none' }, 0.04);
    tl.to(cyan, { x: 0, opacity: 0, duration: 0.04, ease: 'none' }, 0.04);
    tl.to(el, { opacity: 1, duration: 0.02, ease: 'none' }, 0.06);

    // Second micro-burst at ~1.5s (single flash)
    const microTl = gsap.timeline({ delay: 1.5 + index * 0.02 });
    microTl.set([red, cyan], { opacity: 1 }, 0);
    microTl.set(el, { opacity: 0 }, 0);
    microTl.to(red, { x: -2, duration: 0.03, ease: 'none' }, 0);
    microTl.to(cyan, { x: 2, duration: 0.03, ease: 'none' }, 0);
    microTl.to(red, { x: 0, opacity: 0, duration: 0.05, ease: 'none' }, 0.05);
    microTl.to(cyan, { x: 0, opacity: 0, duration: 0.05, ease: 'none' }, 0.05);
    microTl.to(el, { opacity: 1, duration: 0.1, ease: 'none' }, 0.08);

    return () => {
      tl.kill();
      microTl.kill();
    };
  }, [letter, index]);

  if (letter === ' ') {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>;
  }

  return (
    <span className="relative inline-block">
      {/* Red offset copy */}
      <span
        ref={redRef}
        className="absolute left-0 top-0 inline-block text-[var(--crimson)]"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        {letter}
      </span>
      {/* Cyan offset copy */}
      <span
        ref={cyanRef}
        className="absolute left-0 top-0 inline-block text-[var(--cyan)]"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        {letter}
      </span>
      {/* Main white letter */}
      <span ref={letterRef} className="relative inline-block text-[var(--white)]">
        {letter}
      </span>
    </span>
  );
}

/*
 * HeartbeatDot
 * Isolated perpetual animation component (React.memo prevents parent re-renders from resetting)
 */
const HeartbeatDot = React.memo(function HeartbeatDot() {
  return (
    <div
      className="mt-4 h-[6px] w-[6px] rounded-full"
      style={{
        backgroundColor: 'var(--cyan)',
        boxShadow: '0 0 8px rgba(0, 229, 255, 0.4)',
        animation: 'heartbeat 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }}
    />
  );
});

/*
 * Cover Page — The Gateway
 * Fullscreen entry point with glitch title, heartbeat, and click-to-enter
 */
export default function Cover() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const title = 'UNINAMUS';

  // Page load animation sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Step 1 — Absolute darkness (initial state is already black)

      // Step 3 — Subtitle fade (1200ms delay)
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 10 },
          { opacity: 0.7, y: 0, duration: 0.8, delay: 1.2, ease: 'expo.out' }
        );
      }

      // Step 4 — Divider draw (1600ms delay)
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, delay: 1.6, ease: 'power4.inOut' }
        );
      }

      // Step 5 — Enter prompt (2000ms delay)
      if (promptRef.current) {
        gsap.fromTo(
          promptRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, delay: 2.0, ease: 'power2.out' }
        );
      }

      // Step 6 — Cursor heartbeat (2200ms delay)
      if (cursorRef.current) {
        gsap.fromTo(
          cursorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, delay: 2.2, ease: 'power2.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle enter — page transition
  const handleEnter = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          navigate('/carta');
        },
      });

      // Step 1 — Pulse burst: cursor dot explodes
      if (cursorRef.current) {
        tl.to(
          cursorRef.current,
          {
            scale: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'expo.out',
          },
          0
        );
      }

      // Radial gradient flash from center
      const flash = document.createElement('div');
      flash.style.position = 'fixed';
      flash.style.inset = '0';
      flash.style.zIndex = '100';
      flash.style.pointerEvents = 'none';
      flash.style.background =
        'radial-gradient(circle at center, rgba(0, 229, 255, 0.2) 0%, transparent 70%)';
      flash.style.opacity = '0';
      document.body.appendChild(flash);

      tl.to(
        flash,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        0
      );
      tl.to(
        flash,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        0.3
      );

      // Step 2 — Content collapse
      if (containerRef.current) {
        const contentElements =
          containerRef.current.querySelectorAll('.cover-content');
        tl.to(
          contentElements,
          {
            scale: 0.9,
            opacity: 0,
            y: 0,
            duration: 0.5,
            ease: 'power4.inOut',
          },
          0.1
        );
      }

      // Step 3 — Color sweep (vertical wipe from left to right)
      const sweep = document.createElement('div');
      sweep.style.position = 'fixed';
      sweep.style.inset = '0';
      sweep.style.zIndex = '101';
      sweep.style.pointerEvents = 'none';
      sweep.style.backgroundColor = 'var(--void)';
      sweep.style.transformOrigin = 'left center';
      sweep.style.transform = 'scaleX(0)';
      document.body.appendChild(sweep);

      tl.to(
        sweep,
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power4.inOut',
        },
        0.3
      );

      // Cleanup flash/sweep elements after navigation
      tl.call(
        () => {
          flash.remove();
          sweep.remove();
        },
        [],
        1.2
      );
    }, containerRef);
  }, [isTransitioning, navigate]);

  // Keyboard support: Enter or Space triggers transition
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[100dvh] cursor-pointer flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--black)' }}
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      aria-label="Haz clic para entrar"
    >
      {/* Noise overlay for cover only (separate from global body overlay) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.025,
          mixBlendMode: 'overlay',
          backgroundImage: 'url(/noise-texture.png)',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Content column */}
      <div
        className="cover-content relative z-10 flex flex-col items-center"
        style={{ transform: 'translateY(-10vh)' }}
      >
        {/* Title: UNINAMUS with glitch effect */}
        <h1 className="text-center font-display text-[clamp(4rem,12vw,10rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]">
          {title.split('').map((char, i) => (
            <GlitchLetter key={i} letter={char} index={i} />
          ))}
        </h1>

        {/* Subtitle: "una carta digital" */}
        <p
          ref={subtitleRef}
          className="mt-8 font-handwritten text-[clamp(1.25rem,2.5vw,2rem)] normal-case tracking-[0.02em]"
          style={{ color: 'var(--cyan)', opacity: 0 }}
        >
          una carta digital
        </p>

        {/* Horizontal Divider */}
        <div
          ref={dividerRef}
          className="mt-16 h-[1px] w-[120px] origin-center"
          style={{ backgroundColor: 'var(--dim)', transform: 'scaleX(0)' }}
        />

        {/* Enter Prompt */}
        <div ref={promptRef} className="cover-content mt-8" style={{ opacity: 0 }}>
          <span className="animate-breathe font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)] transition-colors hover:text-[var(--white)]">
            [ haz clic para entrar ]
          </span>
        </div>

        {/* Cursor Dot with Heartbeat */}
        <div ref={cursorRef} style={{ opacity: 0 }}>
          <HeartbeatDot />
        </div>
      </div>
    </div>
  );
}
