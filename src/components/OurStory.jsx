import React, { useEffect, useRef } from 'react';
import { Sparkles, Users, Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const { siteContent } = useCms();
  const storyContent = siteContent?.story || {};
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
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

  return (
    <section ref={sectionRef} id="story" className="py-24 bg-[#FAF3E1] relative overflow-hidden text-[#380B0E]">
      {/* Background Line Art Watermark */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none bg-[radial-gradient(#380B0E_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div ref={textRef} className="lg:col-span-6 space-y-6">

            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-4xl sm:text-6xl text-[#380B0E] tracking-tight leading-[1.05]">
              {storyContent.titleLine1 || "More Than Tea."} <br />
              <span className="text-[#D98205]">{storyContent.titleLine2 || "It's a Conversation."}</span>
            </h2>

            <p className="text-lg text-[#380B0E]/90 leading-relaxed font-normal">
              {storyContent.desc1 || "Tea Talk is a community-focused café chain creating spaces where people connect over tea, conversations, and affordable café experiences."}
            </p>

            <p className="text-base text-[#380B0E]/75 leading-relaxed font-normal">
              {storyContent.desc2 || "Born from the vibrant tea drinking culture of Kerala, Tea Talk bridges authentic local warmth with modern, comfortable café aesthetics."}
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFFDF6] border-2 border-[#EAD5BF]">
                <Users className="w-5 h-5 text-[#D98205] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bricolage_Grotesque'] font-bold text-sm text-[#380B0E]">Community First</h4>
                  <p className="text-xs text-[#380B0E]/70 mt-0.5">Designed for connection and warmth.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFFDF6] border-2 border-[#EAD5BF]">
                <Coffee className="w-5 h-5 text-[#D98205] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bricolage_Grotesque'] font-bold text-sm text-[#380B0E]">Crafted Quality</h4>
                  <p className="text-xs text-[#380B0E]/70 mt-0.5">20+ distinct freshly brewed options.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-3 bg-[#F5A623] hover:bg-[#E09418] text-[#380B0E] px-8 py-4 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-base shadow-xl shadow-[#F5A623]/20 hover:scale-105 transition-all group"
              >
                <span>EXPLORE OUR MENU</span>
                <ArrowRight className="w-5 h-5 text-[#380B0E] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Right Column */}
          <div ref={imageRef} className="lg:col-span-6 relative">
            <div className="relative rounded-[45px] rounded-bl-[12px] overflow-hidden border-4 border-[#EAD5BF] shadow-2xl group bg-[#380B0E]">
              <img
                src={storyContent.image || "/tea-toast.png"}
                alt="Tea Talk Toast Cups - More Than Tea, It's a Conversation"
                className="w-full h-[450px] sm:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#380B0E]/80 via-[#380B0E]/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-[#FFFDF6]/95 backdrop-blur-md border-2 border-[#EAD5BF] shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center text-[#380B0E] font-bold text-sm">
                    💬
                  </div>
                  <span className="font-['Bricolage_Grotesque'] font-extrabold text-xs uppercase tracking-wider text-[#D98205]">
                    Brand Vision
                  </span>
                </div>
                <blockquote className="font-['Bricolage_Grotesque'] font-extrabold text-xl text-[#380B0E]">
                  {storyContent.visionQuote || '"Building Kerala\'s Next Scalable Café Brand."'}
                </blockquote>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Smooth Wavy Seam Transition to Dark Section */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          className="relative block w-full h-12 sm:h-20 text-[#2A080A]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C200,90 400,-20 600,60 C800,140 1000,20 1200,70 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
