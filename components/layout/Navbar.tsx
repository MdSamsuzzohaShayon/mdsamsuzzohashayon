// components/layout/Navbar.tsx
'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { INavMenu, ISocial } from '@/types';

interface INavbarProps {
  logo: string;
  navMenus: INavMenu[];
  social: ISocial[];
  scrolled?: boolean;
}

const Navbar = ({ logo, navMenus, social, scrolled = false }: INavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || 'home';
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -100px 0px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!mounted) {
    return <div className="h-20 bg-gray-900/50" />;
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen 
            ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="wrapper-con">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, 'home')}
              className="relative group"
              aria-label="Go to home"
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Image
                  src={logo}
                  alt="Md Samsuzzoha Shayon"
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-gray-700 group-hover:border-rose-500/50 transition-all duration-300 object-cover"
                  priority
                />
              </div>
              
              {/* Remote badge (small) */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900">
                <span className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-1">
                {navMenus.map((menu, index) => (
                  <li key={menu.id}>
                    <a
                      href={`#${menu.text.toLowerCase()}`}
                      onClick={(e) => scrollToSection(e, menu.text.toLowerCase())}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                        activeSection === menu.text.toLowerCase()
                          ? 'text-rose-400'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {menu.text}
                      
                      {/* Active indicator */}
                      <span 
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full transition-all duration-300 ${
                          activeSection === menu.text.toLowerCase()
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-0'
                        }`}
                      />
                      
                      {/* Hover effect */}
                      <span className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/5 rounded-lg transition-colors duration-300" />
                    </a>
                  </li>
                ))}

                {/* Remote CTA Button */}
                <li className="ml-4">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, 'contact')}
                    className="relative px-6 py-2.5 bg-gradient-to-r from-rose-600 to-rose-500 text-white text-sm font-medium rounded-lg overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      Hire Remotely
                    </span>
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-rose-400 transition-colors duration-300"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40 transition-all duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: '80px' }}
      >
        <div className="wrapper-con h-full py-8 flex flex-col">
          {/* Mobile Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navMenus.map((menu, index) => (
                <li 
                  key={menu.id}
                  className={`transform transition-all duration-300 ${
                    isMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <a
                    href={`#${menu.text.toLowerCase()}`}
                    onClick={(e) => {
                      scrollToSection(e, menu.text.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className={`block py-4 px-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                      activeSection === menu.text.toLowerCase()
                        ? 'bg-rose-500/10 text-rose-400 border-l-4 border-rose-500'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                    }`}
                  >
                    {menu.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Contact Info */}
          <div className={`space-y-6 transform transition-all duration-500 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '300ms' }}>
            {/* Remote Availability */}
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-emerald-400">Available for Remote Work</span>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-xs font-mono text-gray-500 tracking-wider uppercase">Connect</p>
              <div className="flex items-center justify-center gap-4">
                {social.map((s) => (
                  <a
                    key={s.id}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label={`Visit my ${s.name} profile`}
                  >
                    <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700 group-hover:border-rose-500/50 group-hover:scale-110 transition-all duration-300">
                      <Image
                        src={`/icons/${s.icon}`}
                        alt={s.name}
                        width={24}
                        height={24}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Hire CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                scrollToSection(e, 'contact');
                setIsMenuOpen(false);
              }}
              className="block w-full py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold text-center rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
            >
              Hire Me Remotely
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;