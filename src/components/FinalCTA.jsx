import React from 'react';
import { Phone, MessageCircle, ArrowRight, Sparkles, Building2, Store } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function FinalCTA() {
  const { siteContent } = useCms();
  const contactContent = siteContent?.contact || {};
  return (
    <section id="contact" className="py-24 bg-[#2A080A] relative overflow-hidden border-t border-[#F5A623]/20">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8">

            <h2 className="font-['Bricolage_Grotesque'] font-extrabold text-4xl sm:text-7xl text-[#F7EBE1] tracking-tight leading-[1.02]">
              Start Your <br />
              <span className="text-[#F5A623]">Tea Talk Franchise</span> <br />
              Today.
            </h2>

            <p className="text-lg text-[#D4B8A5] max-w-lg font-medium leading-relaxed">
              Partner with Kerala's fastest-growing tea café chain. Connect with our franchise expansion team to lock in your location.
            </p>

            {/* Direct Hotline */}
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-[#361113] border-2 border-[#F5A623]/30 max-w-md shadow-xl">
              <div className="p-3.5 rounded-2xl bg-[#1F0607] border border-[#F5A623]/40 text-[#F5A623]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#F5A623]">
                  Franchise Expansion Hotline
                </span>
                <a
                  href={`tel:${(contactContent.phone || '+91 70346 14815').replace(/[^0-9+]/g, '')}`}
                  className="block font-['Bricolage_Grotesque'] font-extrabold text-2xl text-[#F7EBE1] hover:text-[#F5A623] transition-colors"
                >
                  {contactContent.phone || '+91 70346 14815'}
                </a>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${(contactContent.whatsappNumber || '917034614815').replace(/[^0-9]/g, '')}?text=Hi%20Tea%20Talk%20Team,%20I%20am%20interested%20in%20a%20Franchise%20Opportunity.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#F5A623] hover:bg-[#E09418] text-[#2A080A] px-8 py-4 rounded-full font-['Bricolage_Grotesque'] font-extrabold text-base shadow-xl hover:scale-105 transition-all group"
              >
                <MessageCircle className="w-5 h-5 fill-current text-[#2A080A]" />
                <span>WHATSAPP FRANCHISE DESK</span>
                <ArrowRight className="w-4 h-4 text-[#2A080A] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={contactContent.instagramUrl || "https://instagram.com/teatalk.in"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#1F0607] hover:bg-[#361113] text-[#F7EBE1] border-2 border-[#F5A623]/30 px-8 py-4 rounded-full font-['Bricolage_Grotesque'] font-bold text-base transition-all shadow-md hover:border-[#F5A623]"
              >
                <InstagramIcon className="w-5 h-5 text-[#F5A623]" />
                <span>VISIT INSTAGRAM</span>
              </a>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            <div className="bg-[#1F0607] border-4 border-[#F5A623]/30 rounded-[45px] rounded-br-[12px] p-8 shadow-2xl relative overflow-hidden space-y-6 text-[#F7EBE1]">
              
              <div className="flex items-center justify-between border-b border-[#F5A623]/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5A623] rounded-2xl p-1.5 shadow-md">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-['Bricolage_Grotesque'] font-extrabold text-xl text-[#F7EBE1]">
                    FRANCHISE DESK
                  </span>
                </div>
                <span className="text-xs text-[#F5A623] font-bold uppercase">{contactContent.instagramHandle || "@TEATALK.IN"}</span>
              </div>

              {/* QR Cards */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Instagram QR */}
                <div className="bg-[#361113] text-[#F7EBE1] rounded-2xl p-4 text-center group border-2 border-[#F5A623]/30 hover:border-[#F5A623] transition-all">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-2xl mb-3 overflow-hidden shadow-2xl border-2 border-[#F5A623]/40 group-hover:border-[#F5A623] group-hover:scale-105 transition-all bg-[#1F0607]">
                    <img
                      src={contactContent.instagramQr || "/instagram-qr.png"}
                      alt="Tea Talk Instagram QR Code"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F5A623] block font-['Bricolage_Grotesque']">
                    INSTAGRAM
                  </span>
                  <span className="text-xs font-bold text-[#F7EBE1] uppercase">{contactContent.instagramHandle || "@TEATALK.IN"}</span>
                </div>

                {/* WhatsApp QR */}
                <div className="bg-[#361113] text-[#F7EBE1] rounded-2xl p-4 text-center group border-2 border-[#F5A623]/30 hover:border-[#25D366] transition-all">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-2xl mb-3 overflow-hidden shadow-2xl border-2 border-[#25D366]/40 group-hover:border-[#25D366] group-hover:scale-105 transition-all bg-[#1F0607]">
                    <img
                      src={contactContent.whatsappQr || "/whatsapp-qr.png"}
                      alt="Tea Talk WhatsApp QR Code"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#25D366] block font-['Bricolage_Grotesque']">
                    WHATSAPP
                  </span>
                  <span className="text-xs font-bold text-[#F7EBE1]">{contactContent.phone || "+91 70346 14815"}</span>
                </div>

              </div>

              <div className="p-4 rounded-2xl bg-[#361113] border border-[#F5A623]/20 text-center">
                <p className="text-xs text-[#D4B8A5] font-medium">
                  Scan QR codes or tap buttons to connect directly with our franchise expansion managers!
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
