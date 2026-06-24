import { motion } from 'framer-motion';
import { Link } from 'react-router';
import React from 'react';

/* ───────── easing tokens ───────── */
const easeSmooth = [0.4, 0, 0.2, 1] as [number, number, number, number];
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ───────── absolute load timings (seconds) ───────── */
const T = {
  backLink: 0.3,
  photoFrame: 0.5,
  name: 1.5,
  separator: 1.8,
  dedicationText: 2.0,
  finalLine: 2.8,
  footerTimestamp: 3.5,
};

/* ───────── perpetual animation — isolated + memoised ───────── */
const PulsingHeart = React.memo(function PulsingHeart() {
  return (
    <span className="inline-block animate-heartbeat text-[var(--crimson)]">
      &#9829;
    </span>
  );
});

/* ════════════════════════════════════════ */
export default function Dedicatoria() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-black">
      {/* ── Background warm radial glow ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center 80%, rgba(255, 23, 68, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* ═══════ SECTION 1 — Back Link ═══════ */}
      <motion.div
        className="fixed left-0 top-0 z-10 px-[clamp(1.5rem,5vw,4rem)] py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: T.backLink, ease: easeSmooth }}
      >
        <Link
          to="/carta"
          className="group relative font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--rose)]"
        >
          &#8592; volver a la carta
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
      </motion.div>

      {/* ═══════ SECTION 2 — The Dedication (centerpiece) ═══════ */}
      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-[clamp(1.5rem,5vw,4rem)]">

        {/* ── Photo Frame ── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: T.photoFrame, ease: easeSmooth }}
        >
          {/* Frame container with hover glow */}
          <motion.div
            className="group relative overflow-hidden rounded-[4px]"
            initial={{
              boxShadow:
                '0 0 60px rgba(255, 23, 68, 0.12), 0 20px 40px rgba(0,0,0,0.5)',
            }}
            animate={{
              boxShadow:
                '0 0 60px rgba(255, 23, 68, 0.12), 0 20px 40px rgba(0,0,0,0.5)',
            }}
            whileHover={{
              boxShadow:
                '0 0 80px rgba(255, 23, 68, 0.30), 0 20px 40px rgba(0,0,0,0.5)',
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Responsive sizing wrapper */}
            <div className="relative w-[240px] h-[300px] sm:w-[260px] sm:h-[325px] lg:w-[280px] lg:h-[350px] min-[1440px]:w-[320px] min-[1440px]:h-[400px]">

              {/* Photo + overlay (bottom layer) */}
              <motion.div
                className="relative h-full w-full overflow-hidden"
                initial={{ scale: 1.03 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.2,
                  delay: T.photoFrame,
                  ease: easeOutExpo,
                }}
              >
                <img
                  src="/dorian-foto.JPG"
                  alt="Dorian"
                  className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                  style={{ objectPosition: 'center top' }}
                />
                {/* Crimson overlay */}
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay"
                  style={{
                    backgroundColor: 'rgba(255, 23, 68, 0.05)',
                  }}
                />
              </motion.div>

              {/* Outer border */}
              <div
                className="pointer-events-none absolute inset-0 z-[5] rounded-[4px]"
                style={{
                  border: '1px solid rgba(255, 23, 68, 0.25)',
                }}
              />

              {/* Inner border — 4 edges draw sequentially */}
              {/* TOP */}
              <motion.div
                className="absolute top-2 left-2 right-2 z-[6] h-px origin-left lg:top-3 lg:left-3 lg:right-3"
                style={{
                  backgroundColor: 'rgba(255, 64, 129, 0.15)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.4,
                  delay: T.photoFrame,
                  ease: easeSmooth,
                }}
              />
              {/* RIGHT */}
              <motion.div
                className="absolute top-2 right-2 bottom-2 z-[6] w-px origin-top lg:top-3 lg:right-3 lg:bottom-3"
                style={{
                  backgroundColor: 'rgba(255, 64, 129, 0.15)',
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.4,
                  delay: T.photoFrame + 0.4,
                  ease: easeSmooth,
                }}
              />
              {/* BOTTOM */}
              <motion.div
                className="absolute bottom-2 left-2 right-2 z-[6] h-px origin-right lg:bottom-3 lg:left-3 lg:right-3"
                style={{
                  backgroundColor: 'rgba(255, 64, 129, 0.15)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.4,
                  delay: T.photoFrame + 0.8,
                  ease: easeSmooth,
                }}
              />
              {/* LEFT */}
              <motion.div
                className="absolute top-2 left-2 bottom-2 z-[6] w-px origin-bottom lg:top-3 lg:left-3 lg:bottom-3"
                style={{
                  backgroundColor: 'rgba(255, 64, 129, 0.15)',
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.4,
                  delay: T.photoFrame + 1.2,
                  ease: easeSmooth,
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Name ── */}
        <motion.h1
          className="mt-32 font-display text-[clamp(1.5rem,4vw,3rem)] font-medium uppercase tracking-[0.15em] text-[var(--white)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: T.name,
            ease: easeOutExpo,
          }}
        >
          DORIAN
        </motion.h1>

        {/* ── Separator ── */}
        <motion.div
          className="mt-8 h-px w-10 origin-center"
          style={{ backgroundColor: 'rgba(255, 23, 68, 0.4)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.5,
            delay: T.separator,
            ease: easeSmooth,
          }}
        />

        {/* ── Dedication Text ── */}
        <div className="mt-16 flex flex-col items-center gap-1">
          {[
            'Gracias por existir.',
            'Gracias por compartir tu mundo conmigo.',
          ].map((line, i) => (
            <motion.p
              key={i}
              className="font-handwritten text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.5] text-[#FF4081]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: T.dedicationText + i * 0.4,
                ease: easeOutExpo,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* ── Final Line ── */}
        <motion.p
          className="mt-32 text-center font-body text-[0.9375rem] font-light leading-[1.6] tracking-[0.02em] text-[var(--muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: T.finalLine,
            ease: easeSmooth,
          }}
        >
          Esto es para ti. <PulsingHeart />
        </motion.p>
      </div>

      {/* ═══════ SECTION 3 — Footer Note ═══════ */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pb-8 pt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: T.footerTimestamp,
          ease: easeSmooth,
        }}
      >
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.1em] text-[var(--dim)]">
          UNINAMUS — una carta digital
        </p>
      </motion.div>
    </div>
  );
}
