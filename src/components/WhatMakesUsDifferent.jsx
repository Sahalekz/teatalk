import React, { useEffect, useRef } from 'react';
import { Coffee, Users, DollarSign, Leaf, GlassWater, Settings } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCms } from '../context/CmsContext';

gsap.registerPlugin(ScrollTrigger);

export default function WhatMakesUsDifferent() {
  const { siteContent } = useCms();
  const differentImage = siteContent?.different?.image || "/tea-talk-barista.jpg";

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
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

  const features = [
    {
      icon: Coffee,
      title: 'Tea-first positioning',
    },
    {
      icon: Users,
      title: 'Community-focused seating layouts',
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
    },
    {
      icon: Leaf,
      title: '20+ tea varieties',
    },
    {
      icon: GlassWater,
      title: 'Snacks, Shakes, Mojitos & Juices',
    },
    {
      icon: Settings,
      title: 'Standardized Operating Model',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="different" 
      className="py-20 lg:py-28 bg-[#FAF3E1] relative overflow-hidden text-[#380B0E]"
    >
      {/* Background Architectural Line Art Watermark */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none bg-[radial-gradient(#380B0E_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Ambient Radial Highlights */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#E65100]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#380B0E] tracking-tight leading-[1.05]">
            What makes <br />
            <span className="text-[#380B0E]">Tea Talk different</span>
          </h2>
        </div>

        {/* Grid Layout: Left 6 Feature Cards, Right Store Visual & Speech Bubble */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: 6 Light Theme Cards (2 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="bg-[#FFFDF6] border-2 border-[#EAD5BF] hover:border-[#F5A623] rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5E7D5] border border-[#E0CFB9] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] flex items-center justify-center text-[#380B0E] shrink-0 transition-all duration-300 shadow-inner">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-base sm:text-lg text-[#380B0E] leading-snug group-hover:text-[#D98205] transition-colors">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right Column: Store Visual + Iconic Golden Speech Bubble */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center">
            
            {/* Storefront / Barista Graphic Card */}
            <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl overflow-hidden border-4 border-[#EAD5BF] shadow-2xl bg-[#380B0E]">
              <img
                src={differentImage}
                alt="Tea Talk Barista & Experience"
                className="w-full h-80 sm:h-96 object-cover opacity-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#380B0E]/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 bg-[#F5A623] text-[#380B0E] px-4 py-1.5 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-xs shadow-lg uppercase tracking-wider">
                CRAFTED CHAI
              </div>
            </div>

            {/* Iconic Golden Speech Bubble: "Let's talk about tea!" */}
            <div className="mt-6 lg:-mt-12 lg:-mr-6 z-30 relative self-end sm:self-center lg:self-end transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#F5A623] text-[#380B0E] p-6 sm:p-8 rounded-[36px] rounded-br-[4px] shadow-2xl border-4 border-[#380B0E] relative flex flex-col justify-center">
                <span className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl leading-[1.05] tracking-tight">
                  Let's talk <br />
                  about <br />
                  tea!
                </span>
                {/* Speech Tail */}
                <div className="absolute -bottom-4 right-4 w-0 h-0 border-l-[16px] border-l-transparent border-t-[20px] border-t-[#F5A623] border-r-[8px] border-r-transparent" />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Smooth Wavy Seam Transition into Dark WhyTeaTalk Section */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          className="relative block w-full h-12 sm:h-20 text-[#1C0305]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C300,100 600,-20 900,70 C1050,115 1150,40 1200,80 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
