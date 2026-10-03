import React from 'react';
import { Users } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function CommunityExperience() {
  const { siteContent } = useCms();
  const expContent = siteContent?.experience || {};

  const bubbles = [
    { word: 'TEA', pos: 'top-3 left-3 sm:top-6 sm:left-6', delay: '0s' },
    { word: 'TALK', pos: 'top-4 left-1/3 sm:top-6 sm:left-1/3', delay: '1.2s' },
    { word: 'CONNECT', pos: 'top-1/3 left-3 sm:top-1/3 sm:left-6', delay: '2.5s' },
    { word: 'RELAX', pos: 'bottom-4 left-4 sm:bottom-6 sm:left-8', delay: '0.8s' },
    { word: 'MEET', pos: 'bottom-3 left-1/3 sm:bottom-4 sm:left-1/3 hidden sm:block', delay: '1.8s' },
    { word: 'SHARE', pos: 'top-10 left-1/2 sm:top-12 sm:left-1/2 hidden sm:block', delay: '3s' },
  ];

  return (
    <section className="py-24 bg-[#2A080A] relative overflow-hidden text-[#F7EBE1]">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 relative">
            <div className="relative group w-full">
              <img
                src={expContent.image || "/tea-talk-cafe-3d.jpg"}
                alt="Tea Talk Cafe Atmosphere"
                className="w-full h-auto object-contain rounded-3xl group-hover:scale-[1.02] transition-transform duration-700 shadow-2xl"
              />

              {/* Speech Bubbles */}
              {bubbles.map((b) => (
                <div
                  key={b.word}
                  className={`absolute ${b.pos} bg-[#F5A623] text-[#2A080A] px-4 py-2 rounded-2xl rounded-br-none font-['Bricolage_Grotesque'] font-extrabold text-xs sm:text-sm shadow-2xl border-2 border-[#1F0607] animate-float cursor-default hover:scale-110 transition-transform`}
                  style={{ animationDelay: b.delay }}
                >
                  💬 {b.word}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">

            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-4xl sm:text-6xl text-[#F7EBE1] tracking-tight leading-tight">
              {expContent.titleLine1 || "Where"} <br />
              <span className="text-[#F5A623]">{expContent.titleLine2 || "Conversations Begin."}</span>
            </h2>

            <p className="text-base text-[#D4B8A5] leading-relaxed font-medium">
              {expContent.desc1 || "At Tea Talk, our spaces are intentionally crafted to foster human connection. We design warm, welcoming environments with community-oriented seating that encourages people from all walks of life to gather, linger, and converse."}
            </p>

            <p className="text-sm text-[#D4B8A5]/80 leading-relaxed font-normal">
              {expContent.desc2 || "Whether meeting old friends, closing business ideas over hot chai, or finding a cozy corner after a long day — Tea Talk provides an inviting, accessible space for everyone."}
            </p>

            <div className="pt-4 border-t border-[#F5A623]/20 grid grid-cols-2 gap-4">
              <div>
                <div className="font-['Bricolage_Grotesque'] font-extrabold text-xl text-[#F7EBE1]">Community Seating</div>
                <div className="text-xs text-[#D4B8A5] mt-1 font-semibold">Open, comfortable layouts</div>
              </div>
              <div>
                <div className="font-['Bricolage_Grotesque'] font-extrabold text-xl text-[#F5A623]">Warm Vibes</div>
                <div className="text-xs text-[#D4B8A5] mt-1 font-semibold">Kerala hospitality & charm</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Smooth Wavy Seam Transition to Light Parchment Section */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          className="relative block w-full h-12 sm:h-20 text-[#FAF3E1]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
