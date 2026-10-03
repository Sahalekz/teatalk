import React from 'react';

export default function TeaDoodleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08] select-none z-0">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern id="teaDoodlePattern" width="160" height="160" patternUnits="userSpaceOnUse">
            {/* Tea Cup */}
            <path d="M 30 40 L 50 40 L 46 65 A 6 6 0 0 1 40 70 L 36 70 A 6 6 0 0 1 30 65 Z M 50 45 C 55 45 55 58 50 58" fill="none" stroke="#2C0C0D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 35 34 Q 38 28 35 24 M 43 34 Q 46 28 43 24" fill="none" stroke="#2C0C0D" strokeWidth="2" strokeLinecap="round" />

            {/* Tea Leaf */}
            <path d="M 110 30 C 130 30 140 50 140 50 C 140 50 120 60 100 40 Z M 110 35 L 130 45" fill="none" stroke="#2C0C0D" strokeWidth="2.5" strokeLinecap="round" />

            {/* Speech Bubble */}
            <path d="M 30 110 A 15 15 0 0 1 60 110 A 15 15 0 0 1 30 110 Z M 40 123 L 35 132 L 48 125" fill="none" stroke="#2C0C0D" strokeWidth="2.5" strokeLinecap="round" />

            {/* Teapot */}
            <path d="M 110 115 A 18 18 0 0 1 146 115 L 140 135 A 8 8 0 0 1 116 135 Z M 146 118 Q 155 118 152 130 M 110 120 L 100 115" fill="none" stroke="#2C0C0D" strokeWidth="2.5" strokeLinecap="round" />

            {/* Star Sparkles */}
            <path d="M 85 85 L 87 90 L 92 92 L 87 94 L 85 99 L 83 94 L 78 92 L 83 90 Z" fill="#F5A623" />
            <path d="M 15 15 L 16 18 L 19 19 L 16 20 L 15 23 L 14 20 L 11 19 L 14 18 Z" fill="#F5A623" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#teaDoodlePattern)" />
      </svg>
    </div>
  );
}
