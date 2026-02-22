// components/Testimonial/Testimonial.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ITestimonial } from '@/types';

interface ITestimonialProps {
    testimonial: ITestimonial[];
}

// Client logos/badges for visual trust
const TRUST_BADGES = [
    { name: 'Clutch', icon: '⭐', rating: '4.9' },
    { name: 'Upwork', icon: '🏆', rating: 'Top Rated' },
    { name: 'LinkedIn', icon: '💼', rating: 'Recommend' },
];

function Testimonial({ testimonial }: ITestimonialProps) {
    const [selectedTestimonialId, setSelectedTestimonialId] = useState<number>(1);
    const [isLeft, setIsLeft] = useState<boolean>(false);
    const [startPosX, setStartPosX] = useState<number>(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    
    const touchThreshold: number = 50;

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

    const testItemChangeHandler = (e: React.SyntheticEvent, targetId: number) => {
        e.preventDefault();
        setSelectedTestimonialId(targetId);
    };

    const leftArrowItemHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLeft(true);
        setSelectedTestimonialId((prevState) => 
            prevState === 1 ? testimonial.length : prevState - 1
        );
    };

    const rightArrowItemHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLeft(false);
        setSelectedTestimonialId((prevState) => 
            prevState === testimonial.length ? 1 : prevState + 1
        );
    };

    const testimonialTouchStartHandler = (e: React.TouchEvent) => {
        setStartPosX(e.touches[0].clientX);
    };

    const testimonialTouchEndHandler = (e: React.TouchEvent) => {
        const newEndPositionX = e.changedTouches[0].clientX;
        if (startPosX - newEndPositionX > touchThreshold) {
            setIsLeft(false);
            setSelectedTestimonialId((prevState) => 
                prevState === testimonial.length ? 1 : prevState + 1
            );
        } else if (newEndPositionX - startPosX > touchThreshold) {
            setIsLeft(true);
            setSelectedTestimonialId((prevState) => 
                prevState === 1 ? testimonial.length : prevState - 1
            );
        }
    };

    const makeStars = (totalStars: number, num: number) => {
        if (num === 0) return null;
        return (
            <div className="flex items-center gap-1">
                {[...Array(totalStars)].map((_, i) => (
                    <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < num ? 'text-amber-400' : 'text-gray-600'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    const makeButtons = () => {
        return (
            <div className="flex items-center justify-center gap-3 mt-8">
                {testimonial.map((t) => (
                    <button
                        key={t.id}
                        onClick={(e) => testItemChangeHandler(e, t.id)}
                        className={`relative group transition-all duration-300 ${
                            selectedTestimonialId === t.id ? 'scale-110' : 'hover:scale-105'
                        }`}
                        aria-label={`View testimonial ${t.id}`}
                    >
                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            selectedTestimonialId === t.id 
                                ? 'bg-rose-500 w-6' 
                                : 'bg-gray-600 group-hover:bg-gray-500'
                        }`} />
                        
                        {/* Active indicator ring */}
                        {selectedTestimonialId === t.id && (
                            <div className="absolute -inset-2 border-2 border-rose-500/30 rounded-full animate-ping" />
                        )}
                    </button>
                ))}
            </div>
        );
    };

    const currentTestimonial = testimonial.find(t => t.id === selectedTestimonialId);

    return (
        <section 
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950"
            aria-label="Client testimonials"
        >
            {/* Decorative background - matching hero style */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
                <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-rose-500/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-blue-500/5 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-rose-500/20 to-transparent" />
                
                {/* Quote marks pattern */}
                <div className="absolute inset-0 opacity-5 text-9xl text-rose-500/20 overflow-hidden">
                    <div className="absolute top-20 left-10">"</div>
                    <div className="absolute bottom-20 right-10">"</div>
                </div>
            </div>

            <div className="relative z-10 w-[90%] md:w-[80%] mx-auto">
                {/* Section Header */}
                <div className={`max-w-3xl mb-16 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-500/10 rounded-full border border-rose-500/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                        </span>
                        <span className="text-sm font-mono text-rose-400 tracking-wider">
                            TRUSTED BY INDUSTRY LEADERS
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black leading-tight">
                        <span className="text-gray-400">What Clients</span>
                        <br />
                        <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                            Say About Me
                        </span>
                    </h2>
                </div>

                {/* Trust badges strip */}
                <div className={`grid grid-cols-3 gap-4 mb-12 transition-all duration-700 delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {TRUST_BADGES.map((badge, index) => (
                        <div 
                            key={badge.name}
                            className="flex items-center justify-center gap-2 p-3 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <span className="text-xl">{badge.icon}</span>
                            <div>
                                <div className="text-xs text-gray-500">{badge.name}</div>
                                <div className="text-sm font-bold text-rose-400">{badge.rating}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Testimonial Card */}
                <div className={`relative transition-all duration-700 delay-400 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <AnimatePresence mode="wait">
                        {currentTestimonial && (
                            <motion.div
                key={currentTestimonial.id}
                                initial={{ opacity: 0, x: isLeft ? 100 : -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isLeft ? -100 : 100 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                onTouchStart={testimonialTouchStartHandler}
                                onTouchEnd={testimonialTouchEndHandler}
                                className="group relative bg-gray-800/40 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden hover:border-rose-500/30 transition-all duration-500"
                            >
                                {/* Decorative corner brackets */}
                                <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-rose-500/30 z-10" />
                                <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-rose-500/30 z-10" />

                                <div className="grid grid-cols-1 lg:grid-cols-3">
                                    {/* Client Info Section */}
                                    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-8 border-b lg:border-b-0 lg:border-r border-gray-700/50">
                                        {/* Client Image */}
                                        <div className="relative mb-6">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                            {currentTestimonial.clientImg ? (
                                                <img 
                                                    src={currentTestimonial.clientImg} 
                                                    alt={currentTestimonial.client}
                                                    className="relative w-24 h-24 rounded-full object-cover border-4 border-gray-800 group-hover:border-rose-500/50 transition-all duration-300"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="relative w-24 h-24 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center">
                                                    <span className="text-3xl text-gray-600">👤</span>
                                                </div>
                                            )}
                                            
                                            {/* Rating badge */}
                                            <div className="absolute -bottom-2 -right-2 bg-amber-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-amber-500/30">
                                                <span className="text-xs font-mono text-amber-400">
                                                    ★ {currentTestimonial.stars}.0
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {currentTestimonial.client}
                                        </h3>
                                        <p className="text-rose-400/80 text-sm mb-4">
                                            {currentTestimonial.project}
                                        </p>
                                        
                                        {/* Project duration badge */}
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900/50 rounded-full border border-gray-700">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-xs text-gray-400">{currentTestimonial.duration}</span>
                                        </div>
                                    </div>

                                    {/* Testimonial Content Section */}
                                    <div className="lg:col-span-2 p-8">
                                        {/* Quote icon and navigation */}
                                        <div className="flex items-start justify-between mb-6">
                                            <svg 
                                                className="w-16 h-16 text-rose-500/20" 
                                                fill="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                            
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={leftArrowItemHandler}
                                                    className="group/btn w-12 h-12 bg-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-center hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300"
                                                    aria-label="Previous testimonial"
                                                >
                                                    <svg className="w-5 h-5 text-gray-400 group-hover/btn:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={rightArrowItemHandler}
                                                    className="group/btn w-12 h-12 bg-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-center hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300"
                                                    aria-label="Next testimonial"
                                                >
                                                    <svg className="w-5 h-5 text-gray-400 group-hover/btn:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Project title */}
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {currentTestimonial.project}
                                        </h3>

                                        {/* Stars */}
                                        <div className="mb-4">
                                            {makeStars(5, currentTestimonial.stars)}
                                        </div>

                                        {/* Testimonial text */}
                                        <div className="relative">
                                            <p className="text-gray-300 text-lg leading-relaxed italic">
                                                "{currentTestimonial.comments}"
                                            </p>
                                            
                                            {/* Animated quote mark */}
                                            <div className="absolute -bottom-4 -right-4 text-6xl text-rose-500/10 rotate-180">
                                                "
                                            </div>
                                        </div>

                                        {/* Impact metrics */}
                                        <div className="mt-8 flex flex-wrap gap-3">
                                            <span className="px-3 py-1 bg-emerald-500/10 rounded-full text-xs text-emerald-400 border border-emerald-500/20">
                                                ⚡ 100% Satisfaction
                                            </span>
                                            <span className="px-3 py-1 bg-blue-500/10 rounded-full text-xs text-blue-400 border border-blue-500/20">
                                                🎯 On Time Delivery
                                            </span>
                                            <span className="px-3 py-1 bg-amber-500/10 rounded-full text-xs text-amber-400 border border-amber-500/20">
                                                💎 Exceeded Expectations
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="mt-8">
                    {makeButtons()}
                </div>

                {/* Client logos strip */}
                {/* <div className={`mt-12 flex flex-wrap items-center justify-center gap-8 transition-all duration-700 delay-600 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <span className="text-xs font-mono text-gray-600 tracking-wider">TRUSTED BY</span>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-16 h-8 bg-gray-800/30 rounded-lg border border-gray-700/30 flex items-center justify-center">
                            <span className="text-xs text-gray-600">Client {i}</span>
                        </div>
                    ))}
                </div> */}
            </div>

            <style jsx>{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </section>
    );
}

export default Testimonial;