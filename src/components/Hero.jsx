import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, Heart } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import gsap from 'gsap';

export default function Hero() {
  const { siteContent } = useCms();
  const heroContent = siteContent?.hero || {};
  const statsContent = siteContent?.stats || {};
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const highlightedTextRef = useRef(null);
  const videoRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Text & Headline Entrance
      tl.fromTo(
        headlineRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }
      )
        .fromTo(
          highlightedTextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        // 2. Video Entrance (Smooth fade & slight slide)
        .fromTo(
          videoRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-[#1F0607]"
    >
      {/* Full-Bleed Background Video with Transparency Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-85 scale-105"
        />

        {/* Softened Gradient Transparency Overlays for High Video Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F0607]/80 via-[#1F0607]/45 to-[#1F0607]/20 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1F0607] via-[#1F0607]/60 to-transparent z-10" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#2A080A]/80 via-[#2A080A]/40 to-transparent z-10" />
      </div>

      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[750px] h-[750px] bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="max-w-3xl text-center lg:text-left">
          
          {/* Headline */}
          <div ref={headlineRef} className="space-y-1">
            <h1 className="font-['Bricolage_Grotesque'] font-extrabold text-5xl sm:text-7xl xl:text-8xl text-[#FDF8F2] tracking-tight leading-[1.02] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              {heroContent.headline1 || "A Tea Café"}
            </h1>
            <div
              ref={highlightedTextRef}
              className="block font-['Bricolage_Grotesque'] font-extrabold text-5xl sm:text-7xl xl:text-8xl text-[#F5A623] tracking-tight leading-[1.02] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
            >
              {heroContent.headline2 || "for Everyone, Everywhere."}
            </div>
          </div>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-[#FDF8F2] max-w-xl mx-auto lg:mx-0 font-semibold leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {heroContent.subtext || "Tea, conversations, and affordable café experiences — bringing people together, one cup at a time."}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-8 py-4 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-base shadow-xl shadow-[#F5A623]/25 hover:scale-105 transition-all duration-300 group"
            >
              <span>{heroContent.primaryCtaText || "BECOME A FRANCHISE PARTNER"}</span>
              <ArrowRight className="w-5 h-5 text-[#2A080A] group-hover:translate-x-1 transition-transform" />
            </a>
            
            <Link
              to="/menu"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#361113]/90 hover:bg-[#441619] text-[#FDF8F2] border border-[#F5A623]/40 px-8 py-4 rounded-full font-['Bricolage_Grotesque'] font-bold text-base shadow-lg hover:border-[#F5A623] transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 text-[#F5A623]" />
              <span>{heroContent.secondaryCtaText || "EXPLORE MENU"}</span>
            </Link>
          </div>

          {/* Hero Quick Statistics Bar */}
          <div className="mt-12 pt-8 border-t border-[#F5A623]/20 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg">
            <div>
              <div className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#F5A623]">{statsContent.foundedYear || "2020"}</div>
              <div className="text-xs uppercase tracking-wider text-[#FDF8F2]/70 font-semibold mt-1">Founded in</div>
            </div>
            <div>
              <div className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#FDF8F2]">{statsContent.outletsCount || "12"}</div>
              <div className="text-xs uppercase tracking-wider text-[#FDF8F2]/70 font-semibold mt-1">Operational Outlets</div>
            </div>
            <div>
              <div className="font-['Bricolage_Grotesque'] font-extrabold text-3xl sm:text-4xl text-[#F5A623]">{statsContent.varietiesCount || "20+"}</div>
              <div className="text-xs uppercase tracking-wider text-[#FDF8F2]/70 font-semibold mt-1">Tea Varieties</div>
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
          <path d="M0,0 C150,80 350,-30 500,45 C650,120 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
