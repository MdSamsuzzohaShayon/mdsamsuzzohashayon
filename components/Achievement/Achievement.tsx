// components/Achievement/Achievement.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react';
import { IAchievement } from '@/types';
import "./achievement.scss";

interface IAchievementsProps {
    achievements: IAchievement[];
}

// Calculate experience years once
const START_YEAR = 2020;
const CURRENT_YEAR = new Date().getFullYear();
const YEARS_OF_EXPERIENCE = CURRENT_YEAR - START_YEAR;

const Achievements = ({ achievements }: IAchievementsProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState<{ [key: string]: number }>({});
    const sectionRef = useRef<HTMLElement>(null);
    const countingStarted = useRef(false);

    // Intersection Observer for animation trigger
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2, rootMargin: '0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Counter animation
    useEffect(() => {
        if (!isVisible || countingStarted.current) return;
        
        countingStarted.current = true;
        
        const durations = [2000, 1800, 2200, 1900]; // Different durations for visual interest
        const steps = 60; // 60fps
        
        achievements.forEach((achievement, index) => {
            const targetNum = achievement.num;
            if (isNaN(targetNum)) return;
            
            let current = 0;
            const increment = targetNum / (durations[index] / (1000 / 60));
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNum) {
                    setCounts(prev => ({ ...prev, [achievement.id]: targetNum }));
                    clearInterval(timer);
                } else {
                    setCounts(prev => ({ ...prev, [achievement.id]: Math.floor(current) }));
                }
            }, 1000 / 60);
            
            return () => clearInterval(timer);
        });
    }, [isVisible, achievements]);

    // Metrics that matter to employers
    const impactMetrics = [
        { label: 'Uptime Achieved', value: '99.99%' },
        { label: 'Code Coverage', value: '85%+' },
        { label: 'Response Time', value: '<100ms' },
        { label: 'Client Retention', value: '100%' },
    ];

    return (
        <section 
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden"
            aria-label="Achievements and impact metrics"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient Orbs */}
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-rose-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }} />
            </div>

            <div className="wrapper-con relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <span className="text-rose-400 font-mono text-sm tracking-[0.2em] uppercase">
                        • Proof of Impact •
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
                        <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                            Numbers
                        </span>{' '}
                        That Speak for Themselves
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
                        Not just code — measurable business outcomes and technical excellence
                    </p>
                </div>

                {/* Main Achievement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {achievements.map((achievement, index) => (
                        <div
                            key={achievement.id}
                            className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 transition-all duration-700 transform hover:scale-105 hover:border-rose-500/30 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/5 to-rose-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Icon */}
                            <div className="relative w-16 h-16 mb-6">
                                <div className="absolute inset-0 bg-rose-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                                <div className="relative w-full h-full bg-gray-900 rounded-xl flex items-center justify-center border border-gray-700 group-hover:border-rose-500/50 transition-colors duration-300">
                                    <img
                                        src={`/icons/${achievement.icon}`}
                                        alt=""
                                        className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Counter */}
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">
                                        {counts[achievement.id] || 0}
                                    </span>
                                    <span className="text-2xl font-bold text-rose-400">+</span>
                                </div>
                                
                                <h3 className="text-xl font-semibold text-white">
                                    {achievement.achieve}
                                </h3>
                                
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {achievement.text}
                                </p>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-rose-500/20 group-hover:border-rose-500/40 transition-colors duration-300" />
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-rose-500/20 group-hover:border-rose-500/40 transition-colors duration-300" />
                        </div>
                    ))}
                </div>

                {/* Experience Banner */}
                <div 
                    className={`relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-8 md:p-12 overflow-hidden transition-all duration-700 delay-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, #e11d48 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Years of Experience */}
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="text-7xl md:text-8xl font-black bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                                    {YEARS_OF_EXPERIENCE}
                                </div>
                                <div className="absolute -top-3 -right-3">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                                    </span>
                                </div>
                            </div>
                            <div className="border-l-2 border-gray-700 pl-6">
                                <div className="text-2xl font-bold text-white">Years of</div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                                    Production Experience
                                </div>
                                <p className="text-gray-400 mt-2">Since {START_YEAR} · Full-time remote ready</p>
                            </div>
                        </div>

                        {/* Technical Impact Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
                            {impactMetrics.map((metric, index) => (
                                <div 
                                    key={metric.label}
                                    className={`text-center p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 transition-all duration-700 ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                                >
                                    <div className="text-xl font-bold text-rose-400">{metric.value}</div>
                                    <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Remote Work Badge */}
                    <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-xs font-mono text-emerald-400 tracking-wider">REMOTE · WORLDWIDE</span>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className={`flex flex-wrap items-center justify-center gap-8 mt-12 transition-all duration-700 delay-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {[
                        { label: '100% Delivery Success', icon: '✅' },
                        { label: 'On-time Completion', icon: '⏱️' },
                        { label: 'NPS Score: 75', icon: '📊' },
                        { label: 'Zero Critical Bugs', icon: '🐛' },
                    ].map((item, index) => (
                        <div key={item.label} className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-mono">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative Lines */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
        </section>
    );
};

export default Achievements;