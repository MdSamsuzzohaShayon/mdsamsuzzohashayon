// components/layout/Footer.tsx
'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface IFooterProps {
    logo: string;
}

// Quick navigation links
const QUICK_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

// Services offered
const SERVICES = [
    'Full-Stack Development',
    'System Architecture',
    'API Design & Development',
    'Performance Optimization',
    'Technical Consulting',
    'Code Reviews',
];

// Tech stack highlights
const TECH_STACK = [
    'Node.js', 'Next.js', 'React', 'TypeScript',
    'PostgreSQL', 'MongoDB', 'AWS', 'Docker',
];

const Footer = ({ logo }: IFooterProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = React.useRef<HTMLElement>(null);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer 
            ref={sectionRef}
            className="relative bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800/50 overflow-hidden"
            aria-label="Site footer"
        >
            {/* Decorative background - matching hero style */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
                <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-rose-500/5 rounded-full blur-3xl translate-y-1/2" />
                <div className="absolute top-0 right-0 w-[25rem] h-[25rem] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2" />
                
                {/* Diagonal lines */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, #e11d48 0px, #e11d48 1px, transparent 1px, transparent 20px)`,
                }} />
            </div>

            <div className="relative z-10 w-[90%] md:w-[80%] mx-auto py-16 md:py-20">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Logo and Name */}
                        <div className={`transition-all duration-700 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <img
                                        src={logo}
                                        alt="Md Samsuzzoha Shayon"
                                        className="relative w-16 h-16 rounded-full border-2 border-gray-700 group-hover:border-rose-500/50 transition-all duration-300 object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Md Samsuzzoha Shayon</h3>
                                    <p className="text-sm text-rose-400">Senior Full-Stack Developer</p>
                                </div>
                            </div>
                        </div>

                        {/* Professional Summary */}
                        <p className={`text-gray-400 text-sm leading-relaxed transition-all duration-700 delay-100 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            Building scalable, high-performance web applications with modern technologies. 
                            6+ years of experience delivering value to clients worldwide.
                        </p>

                        {/* Availability Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 transition-all duration-700 delay-200 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-xs font-mono text-emerald-400">Available for remote work</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className={`text-sm font-mono text-rose-400 tracking-wider mb-4 transition-all duration-700 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            NAVIGATION
                        </h4>
                        <ul className="space-y-3">
                            {QUICK_LINKS.map((link, index) => (
                                <li 
                                    key={link.name}
                                    className={`transition-all duration-700 ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${400 + index * 50}ms` }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-gray-400 hover:text-rose-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-rose-400 transition-colors" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-3">
                        <h4 className={`text-sm font-mono text-rose-400 tracking-wider mb-4 transition-all duration-700 delay-500 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            SERVICES
                        </h4>
                        <ul className="grid grid-cols-2 gap-2">
                            {SERVICES.map((service, index) => (
                                <li 
                                    key={service}
                                    className={`text-gray-400 text-sm transition-all duration-700 ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${600 + index * 30}ms` }}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="w-1 h-1 bg-rose-500/50 rounded-full" />
                                        {service}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="lg:col-span-3">
                        <h4 className={`text-sm font-mono text-rose-400 tracking-wider mb-4 transition-all duration-700 delay-700 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            TECH STACK
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {TECH_STACK.map((tech, index) => (
                                <span
                                    key={tech}
                                    className={`px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400 border border-gray-700 hover:border-rose-500/30 hover:text-rose-400 transition-all duration-300 ${
                                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                    }`}
                                    style={{ transitionDelay: `${800 + index * 50}ms` }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className={`relative my-10 transition-all duration-700 delay-1000 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 bg-gradient-to-b from-gray-900 to-gray-950 text-gray-600 text-xs font-mono">
                            ✦ REMOTE FIRST · GLOBAL REACH ✦
                        </span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 delay-1100 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Copyright */}
                    <p className="text-gray-500 text-xs">
                        © {currentYear} Md Samsuzzoha Shayon. All rights reserved.
                    </p>

                    {/* Professional Links */}
                    <div className="flex items-center gap-6">
                        <a 
                            href="#privacy" 
                            className="text-xs text-gray-600 hover:text-rose-400 transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        <a 
                            href="#terms" 
                            className="text-xs text-gray-600 hover:text-rose-400 transition-colors"
                        >
                            Terms of Service
                        </a>
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        <a 
                            href="#sitemap" 
                            className="text-xs text-gray-600 hover:text-rose-400 transition-colors"
                        >
                            Sitemap
                        </a>
                    </div>

                    {/* Built with */}
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>Built with</span>
                        <span className="text-rose-400">❤</span>
                        <span>using Next.js & Tailwind</span>
                    </div>
                </div>

                {/* Micro-interaction: Scroll to top */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`absolute bottom-8 right-8 w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 flex items-center justify-center hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300 group ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    aria-label="Scroll to top"
                    style={{ transitionDelay: '1200ms' }}
                >
                    <svg 
                        className="w-5 h-5 text-gray-400 group-hover:text-rose-400 transition-colors" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>

            <style jsx>{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </footer>
    );
};

export default Footer;