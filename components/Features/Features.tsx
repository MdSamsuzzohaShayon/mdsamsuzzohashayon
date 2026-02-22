// components/Features/Features.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react';
import { IFeature } from '@/types';
import './Features.scss'; // For any custom SCSS that Tailwind can't handle

interface IFeaturesProps {
    features: IFeature[];
}

// Business impact categories
const IMPACT_CATEGORIES = [
    { label: 'Revenue Growth', color: 'emerald' },
    { label: 'Cost Reduction', color: 'blue' },
    { label: 'Time Savings', color: 'amber' },
    { label: 'Scalability', color: 'rose' },
];

const Features = ({ features }: IFeaturesProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

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

    // Business value propositions mapped to features
    const businessValue = [
        {
            metric: '2.5x',
            description: 'faster time-to-market',
            impact: 'Launch products ahead of competitors'
        },
        {
            metric: '60%',
            description: 'reduction in technical debt',
            impact: 'Lower maintenance costs long-term'
        },
        {
            metric: '99.99%',
            description: 'application uptime',
            impact: 'Zero revenue loss from downtime'
        },
        {
            metric: '3x',
            description: 'development velocity',
            impact: 'More features delivered per sprint'
        }
    ];

    return (
        <section 
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden bg-gray-900/50"
            aria-label="Services and business value"
        >
            {/* Hero-style background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-rose-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulse-slower" />
                <div className="absolute top-1/2 left-1/3 w-[30rem] h-[30rem] bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 animate-pulse-slowest" />
                
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }} />
                
                {/* Diagonal lines */}
                <div className="absolute inset-0 features-diagonal-lines" aria-hidden="true" />
            </div>

            <div className="wrapper-con relative z-10">
                {/* Section Header — Client-focused */}
                <div className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-500/10 rounded-full border border-rose-500/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                        </span>
                        <span className="text-sm font-mono text-rose-400 tracking-wider">
                            YOUR BUSINESS ADVANTAGE
                        </span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        <span className="text-gray-300">What I Bring to</span>
                        <br />
                        <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                            Your Organization
                        </span>
                    </h2>
                    
                    <p className="text-xl text-gray-400 mt-6 leading-relaxed">
                        Not just code — I deliver business outcomes. Here's how my expertise 
                        translates into measurable value for your team and bottom line.
                    </p>
                </div>

                {/* Value Metrics Strip — Infographic Style */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 transition-all duration-700 delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {businessValue.map((item, index) => (
                        <div
                            key={item.metric}
                            className="group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:border-rose-500/30 transition-all duration-300 hover:scale-105"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/5 to-rose-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative">
                                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                                    {item.metric}
                                </div>
                                <div className="text-sm font-mono text-gray-400 mt-1">
                                    {item.description}
                                </div>
                                <div className="w-8 h-px bg-rose-500/30 my-3" />
                                <div className="text-xs text-gray-500">
                                    {item.impact}
                                </div>
                            </div>

                            {/* Impact category badge */}
                            <div className="absolute -top-2 -right-2">
                                <span className={`px-2 py-1 text-xs font-mono rounded-full bg-${IMPACT_CATEGORIES[index].color}-500/10 border border-${IMPACT_CATEGORIES[index].color}-500/20 text-${IMPACT_CATEGORIES[index].color}-400`}>
                                    {IMPACT_CATEGORIES[index].label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Features Grid — With Client Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        // Map features to client benefits (customize based on your actual features)
                        const clientBenefit = [
                            'Reduce infrastructure costs by 40%',
                            'Ship features 3x faster',
                            'Handle 10x more users',
                            'Decrease bug rate by 60%',
                            'Improve developer productivity',
                            'Scale without rewrites'
                        ][index % 6];

                        return (
                            <div
                                key={feature.id}
                                className={`group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-700 transform hover:scale-[1.02] hover:border-rose-500/30 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                }`}
                                style={{ transitionDelay: `${300 + index * 100}ms` }}
                                onMouseEnter={() => setActiveFeature(index)}
                                onMouseLeave={() => setActiveFeature(null)}
                            >
                                {/* Animated background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-rose-500/0 to-rose-500/0 group-hover:from-rose-500/5 group-hover:via-rose-500/5 group-hover:to-transparent transition-all duration-500" />
                                
                                {/* Top accent line */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-rose-600 transform origin-left transition-transform duration-500 ${
                                    activeFeature === index ? 'scale-x-100' : 'scale-x-0'
                                }`} />

                                <div className="relative p-8">
                                    {/* Icon with glow */}
                                    <div className="relative w-16 h-16 mb-6">
                                        <div className={`absolute inset-0 bg-rose-500/20 rounded-xl blur-xl transition-all duration-500 ${
                                            activeFeature === index ? 'opacity-100 scale-150' : 'opacity-0'
                                        }`} />
                                        <div className="relative w-full h-full bg-gray-900 rounded-xl flex items-center justify-center border border-gray-700 group-hover:border-rose-500/50 transition-all duration-300">
                                            <img
                                                src={`/icons/${feature.icon}`}
                                                alt=""
                                                className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>

                                    {/* Title and description */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                        {feature.desc}
                                    </p>

                                    {/* Client Benefit — The "What's in it for you" */}
                                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                                        <div className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <div>
                                                <span className="text-xs font-mono text-rose-400 block mb-1">YOUR BENEFIT</span>
                                                <span className="text-sm text-gray-300">{clientBenefit}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ROI Indicator */}
                                    <div className="absolute bottom-4 right-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-1 h-4 rounded-full transition-all duration-300 ${
                                                        i < 2 ? 'bg-rose-500' : 'bg-gray-600'
                                                    }`}
                                                    style={{
                                                        height: `${8 + (i * 4)}px`,
                                                        opacity: activeFeature === index ? 1 : 0.5
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ROI Calculator Teaser */}
                {/* <div className={`mt-20 text-center transition-all duration-700 delay-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="inline-flex flex-col items-center p-8 bg-gray-800/30 rounded-3xl border border-gray-700/50">
                        <span className="text-4xl mb-4">📈</span>
                        <h4 className="text-xl font-bold text-white mb-2">Want to calculate your ROI?</h4>
                        <p className="text-gray-400 mb-6 max-w-md">
                            See exactly how much time and money my expertise can save your organization.
                        </p>
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
                        >
                            <span>Calculate Your Savings</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div> */}
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
        </section>
    );
};

export default Features;