import React from 'react';

const BreathingEllipsis = React.memo(function BreathingEllipsis() {
  return (
    <div className="flex min-h-[30vh] items-center justify-center">
      <span
        className="font-display text-[clamp(1.5rem,4vw,3rem)] font-medium tracking-[-0.01em]"
        style={{
          color: 'var(--blush)',
          opacity: 0.3,
          animation: 'breathe 4s ease-in-out infinite',
        }}
      >
        ...
      </span>
      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
});

export default BreathingEllipsis;
