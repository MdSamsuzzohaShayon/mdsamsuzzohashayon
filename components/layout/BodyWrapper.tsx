// components/layout/BodyWrapper.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStaticData } from '@/lib/StaticDataProvider';
import './BodyWrapper.scss';

function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { logo, navMenus, social } = useStaticData();
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Lightweight JS scroll progress — replaces framer-motion entirely
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = scrollTop / (scrollHeight - clientHeight);
      bar.style.transform = `scaleX(${Math.min(progress, 1)})`;
      
      // Add background to navbar when scrolled
      setScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="body-wrapper relative min-h-screen bg-gray-900">
      {/* CSS-transform scroll bar — zero bundle cost */}
      <div
        ref={barRef}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600 z-[100] origin-left transform-gpu"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-hidden="true"
      />

      {/* Ambient background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-rose-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-blue-500/5 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-purple-500/5 rounded-full blur-3xl animate-pulse-slowest" />
      </div>

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Navbar logo={logo} navMenus={navMenus} social={social} scrolled={scrolled} />
      
      <main id="main-content" className="relative z-10">
        {children}
      </main>
      
      <Footer logo={logo} />
    </div>
  );
}

export default BodyWrapper;