import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyTeaTalk() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const pillarsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        pillarsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      title: 'PRODUCT',
      subtitle: '20+ Tea Varieties',
      position: 'top-left',
    },
    {
      title: 'LOCAL RELEVANCE',
      subtitle: 'Built for Kerala consumers',
      position: 'top-right',
    },
    {
      title: 'EXPERIENCE',
      subtitle: 'Conversation-focused café design',
      position: 'bottom-left',
    },
    {
      title: 'SCALABILITY',
      subtitle: 'Franchise-ready operating model',
      position: 'bottom-right',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="why-tea-talk" 
      className="py-24 lg:py-32 bg-[#1C0305] relative overflow-hidden text-[#FDF8F2]"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        
        {/* Section Title matching Brochure Image */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#F5A623] tracking-tight drop-shadow-lg">
            Why Tea Talk Wins
          </h2>
        </div>

        {/* 4 Pillars & Central Dual Tea Cup Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-center">
          {pillars.map((item, idx) => (
            <div
              key={item.title}
              ref={(el) => (pillarsRef.current[idx] = el)}
              className="bg-[#2A080A]/80 border-2 border-[#F5A623]/30 hover:border-[#F5A623] rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F5A623]/20 group text-center lg:text-left"
            >
              <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl sm:text-3xl text-[#FFFFFF] tracking-tight group-hover:text-[#F5A623] transition-colors uppercase">
                {item.title}
              </h3>
              <p className="font-['Bricolage_Grotesque'] font-bold text-base sm:text-lg text-[#F5A623] mt-2">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Central Branded Cup Visual */}
        <div className="mt-16 flex justify-center">
          <div className="relative group cursor-pointer">
            <div className="w-56 sm:w-72 bg-gradient-to-b from-[#361113] to-[#1F0607] border-4 border-[#F5A623] rounded-[45px] rounded-br-[12px] p-6 text-center shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto mb-3 bg-[#F5A623] rounded-3xl rounded-br-sm p-3 shadow-xl flex items-center justify-center">
                <img src="/logo.png" alt="Tea Talk Logo" className="w-full h-full object-contain" />
              </div>
              <div className="font-['Bricolage_Grotesque'] font-extrabold text-3xl text-[#FDF8F2]">
                TEA TALK
              </div>
              <p className="text-xs text-[#F5A623] font-extrabold uppercase tracking-widest mt-1">
                Franchise & Brand Core
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Smooth Wavy Seam Transition into Light Parchment OutletPresence Section */}
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
