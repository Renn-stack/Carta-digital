import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CartaFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    const elements = footerRef.current.querySelectorAll('.footer-animate');

    elements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="w-full pt-32 pb-16 text-center"
      style={{
        background: 'linear-gradient(to bottom, var(--black) 0%, rgba(255, 23, 68, 0.03) 100%)',
      }}
    >
      {/* Thin line above */}
      <div
        className="footer-animate mx-auto mb-8 h-px w-16"
        style={{
          backgroundColor: 'var(--crimson)',
          opacity: 0.3,
        }}
      />

      {/* Heart with pulse */}
      <div
        className="footer-animate mb-4 text-[2rem]"
        style={{
          color: 'var(--crimson)',
          animation: 'heartbeat 1.5s ease-in-out infinite',
          opacity: 0,
        }}
      >
        &#9829;
      </div>

      {/* Para Dorian */}
      <p
        className="footer-animate mb-2 font-handwritten text-[clamp(2rem,5vw,4rem)] leading-[1.2]"
        style={{ color: 'var(--rose)', opacity: 0 }}
      >
        Para Dorian
      </p>

      {/* con todo mi cariño */}
      <p
        className="footer-animate mb-8 font-mono text-xs uppercase tracking-[0.1em]"
        style={{ color: 'var(--dim)', opacity: 0 }}
      >
        con todo mi cariño
      </p>

      {/* Link to dedicatoria */}
      <Link
        to="/dedicatoria"
        className="footer-animate inline-block font-mono text-sm uppercase tracking-[0.08em] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--rose)] hover:underline"
        style={{ opacity: 0 }}
      >
        &rarr; dedicatoria especial
      </Link>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </footer>
  );
}
