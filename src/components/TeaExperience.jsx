import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, Building2, Award, TrendingUp, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TeaExperience() {
  const storeFormats = [
    {
      title: 'EXPRESS KIOSK',
      size: '100 - 200 Sq. Ft.',
      desc: 'Compact, high-velocity kiosk model ideal for metro stations, tech parks, transit hubs, and busy streets.',
      icon: Store,
      badge: 'Low Investment',
      features: ['Fast Setup & Launch', 'Low Overhead Costs', 'High Footfall Turnover', '1-Operator Efficiency']
    },
    {
      title: 'STANDARD CAFÉ',
      size: '300 - 600 Sq. Ft.',
      desc: 'Vibrant neighborhood café designed for comfortable seating, community conversations, and takeaway orders.',
      icon: Building2,
      badge: 'Most Popular',
      features: ['Community Gathering Vibe', 'High Average Ticket Size', 'Comprehensive Menu Lineup', 'Strong Repeat Footfall']
    },
    {
      title: 'FLAGSHIP LOUNGE',
      size: '700+ Sq. Ft.',
      desc: 'Premium destination café with full lounge seating, expanded seating layout, and prime landmark presence.',
      icon: Award,
      badge: 'High Revenue',
      features: ['Landmark Brand Presence', 'Corporate & Family Hub', 'Maximum Revenue Potential', 'Event & Gathering Ready']
    }
  ];

  return (
    <section id="franchise-model" className="py-24 bg-[#2A080A] relative overflow-hidden border-t border-[#F5A623]/20">
      {/* Glow Effects */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#E65100]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-4xl sm:text-6xl text-[#F7EBE1] tracking-tight">
              Engineered for <br />
              <span className="text-[#F5A623]">Scalable Profitability</span>
            </h2>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-8 py-4 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-base shadow-xl hover:scale-105 transition-all group w-max"
          >
            <span>APPLY FOR FRANCHISE</span>
            <ArrowRight className="w-5 h-5 text-[#2A080A] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Formats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {storeFormats.map((format) => {
            const Icon = format.icon;
            return (
              <div
                key={format.title}
                className="bg-[#361113] border border-[#F5A623]/30 rounded-3xl p-8 hover:border-[#F5A623] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F5A623]/15 group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A623]/5 rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-[#1F0607] border border-[#F5A623]/40 text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-[#2A080A] transition-all shadow-md">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] px-3.5 py-1 rounded-full text-xs font-['Bricolage_Grotesque'] font-extrabold shadow-sm">
                      {format.badge}
                    </span>
                  </div>

                  <span className="text-xs font-['Bricolage_Grotesque'] font-extrabold uppercase tracking-widest text-[#F5A623]">
                    {format.size}
                  </span>
                  
                  <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F7EBE1] mt-1 mb-3 group-hover:text-[#F5A623] transition-colors">
                    {format.title}
                  </h3>

                  <p className="text-sm text-[#D4B8A5] leading-relaxed font-medium mb-6">
                    {format.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-[#F5A623]/20">
                    {format.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-[#F7EBE1]/90 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href="#contact"
                    className="flex items-center justify-between w-full py-3 px-5 rounded-2xl bg-[#1F0607] border border-[#F5A623]/30 hover:bg-[#F5A623] hover:text-[#2A080A] text-xs font-['Bricolage_Grotesque'] font-extrabold text-[#F7EBE1] transition-all group/btn"
                  >
                    <span>Request Format Investment Details</span>
                    <ArrowRight className="w-4 h-4 text-[#F5A623] group-hover/btn:text-[#2A080A] group-hover/btn:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Digital Menu Callout Box for Customers */}
        <div className="bg-gradient-to-r from-[#1F0607] via-[#361113] to-[#1F0607] border-2 border-[#F5A623]/50 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs font-['Bricolage_Grotesque'] font-extrabold mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Product Lineup & Pricing</span>
            </div>
            <h3 className="font-['Bricolage_Grotesque'] font-extrabold text-2xl sm:text-4xl text-[#F7EBE1]">
              Looking to Explore Our Customer Menu?
            </h3>
            <p className="mt-2 text-sm text-[#D4B8A5] font-medium leading-relaxed">
              We offer over 20+ signature tea varieties, craft beverages, shakes, and hot snacks. Access our complete interactive digital menu with pricing and details.
            </p>
          </div>

          <Link
            to="/menu"
            className="shrink-0 flex items-center gap-3 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-8 py-4 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-sm shadow-xl hover:scale-105 transition-all group"
          >
            <span>EXPLORE DIGITAL MENU</span>
            <ArrowRight className="w-4 h-4 text-[#2A080A] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
