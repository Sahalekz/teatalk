import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BrandStats from '../components/BrandStats';
import OurStory from '../components/OurStory';
import CommunityExperience from '../components/CommunityExperience';
import WhatMakesUsDifferent from '../components/WhatMakesUsDifferent';
import WhyTeaTalk from '../components/WhyTeaTalk';
import OutletPresence from '../components/OutletPresence';
import Gallery from '../components/Gallery';
import TalkTransition from '../components/TalkTransition';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#2A080A] text-[#F7EBE1] font-sans selection:bg-[#F5A623] selection:text-[#2A080A]">
      <Navbar />
      <main>
        <Hero />
        <BrandStats />
        <OurStory />
        <CommunityExperience />
        <WhatMakesUsDifferent />
        <WhyTeaTalk />
        <OutletPresence />
        <Gallery />
        <TalkTransition />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
