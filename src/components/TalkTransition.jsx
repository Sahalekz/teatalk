import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TalkTransition() {
  const containerRef = useRef(null);
  const bubbleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bubbleRef.current,
        { scale: 0.85, opacity: 0.7, y: 30 },
        {
          scale: 1.05,
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-[#2A080A] relative overflow-hidden flex items-center justify-center border-t border-[#F5A623]/20">
      
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        
        {/* Signature Speech Bubble */}
        <div
          ref={bubbleRef}
          className="bg-gradient-to-br from-[#F5A623] to-[#E65100] text-[#2A080A] p-10 sm:p-16 rounded-[60px] rounded-br-[15px] shadow-2xl border-4 border-[#1F0607] inline-block"
        >
          <span className="text-xs font-['Bricolage_Grotesque'] font-extrabold uppercase tracking-widest bg-[#1F0607] text-[#F5A623] px-4 py-1.5 rounded-full inline-block mb-4 shadow-md">
            Tea Talk Signature
          </span>
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-4xl sm:text-7xl tracking-tight leading-none text-[#2A080A]">
            Let's talk <br />
            about tea!
          </h2>
        </div>

      </div>
    </section>
  );
}
