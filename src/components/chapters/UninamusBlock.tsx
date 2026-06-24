import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function UninamusBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  const lines = [
    { text: '┌─────────────────────────────────────┐', indent: false },
    { text: '  uninamus  (n.)', indent: false },
    { text: '', indent: false },
    { text: '  dos personas caminando juntas', indent: false },
    { text: '  por el mundo, observándolo y', indent: false },
    { text: '  descubriéndolo lado a lado.', indent: false },
    { text: '', indent: false },
    { text: '  una unión que existe por sí misma.', indent: false },
    { text: '', indent: false },
    { text: '  etimología: uni- (unión)', indent: false },
    { text: '             + namu (human, al revés)', indent: false },
    { text: '             + -s (plural)', indent: false },
    { text: '└─────────────────────────────────────┘', indent: false },
  ];

  useGSAP(() => {
    if (!containerRef.current || !blockRef.current) return;

    const lineEls = blockRef.current.querySelectorAll('.code-line');

    // Line-by-line type-in effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    lineEls.forEach((line, i) => {
      tl.fromTo(
        line,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.08, ease: 'none' },
        i * 0.08
      );
    });

    // Glow pulse on "uninamus" word after type-in completes
    if (glowRef.current) {
      tl.fromTo(
        glowRef.current,
        { textShadow: '0 0 0px rgba(255, 179, 0, 0)' },
        {
          textShadow: '0 0 20px rgba(255, 179, 0, 0.3)',
          duration: 0.5,
          ease: 'power2.out',
        },
        '>'
      );
      tl.to(
        glowRef.current,
        {
          textShadow: '0 0 0px rgba(255, 179, 0, 0)',
          duration: 0.5,
          ease: 'power2.in',
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="mx-auto max-w-[720px] px-[clamp(1.5rem,5vw,4rem)] py-8">
      <div
        ref={blockRef}
        className="relative overflow-hidden rounded-lg p-6 md:p-8"
        style={{
          backgroundColor: 'var(--charcoal)',
          borderLeft: '3px solid var(--amber)',
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className="code-line font-mono text-[clamp(0.75rem,1.2vw,0.9375rem)] leading-[1.6]"
            style={{ opacity: 0, color: 'var(--light-gray)' }}
          >
            {i === 1 ? (
              <span>
                <span
                  ref={i === 1 ? glowRef : undefined}
                  className="font-handwritten text-[clamp(2rem,5vw,4rem)] leading-[1.2]"
                  style={{ color: 'var(--amber)' }}
                >
                  uninamus
                </span>
                <span style={{ color: 'var(--muted)' }}>{'  (n.)'}</span>
              </span>
            ) : (
              <span style={{ color: line.text.startsWith('  eti') || line.text.startsWith('             +') ? 'var(--muted)' : 'var(--light-gray)' }}>
                {line.text}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
