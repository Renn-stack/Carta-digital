import React from 'react';

interface EmojiPulseProps {
  emoji: string;
  size?: string;
}

const EmojiPulse = React.memo(function EmojiPulse({ emoji, size = '2em' }: EmojiPulseProps) {
  return (
    <span
      className="inline-block"
      style={{
        fontSize: size,
        animation: 'emojiPulse 2s ease-in-out infinite',
        lineHeight: 1,
      }}
    >
      {emoji}
      <style>{`
        @keyframes emojiPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </span>
  );
});

export default EmojiPulse;
