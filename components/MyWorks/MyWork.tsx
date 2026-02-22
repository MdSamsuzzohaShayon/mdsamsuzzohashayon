// components/MyWorks/MyWork.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon, CodeBracketIcon, PlayCircleIcon, ChartBarIcon, ClockIcon, UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline';
import { IWork } from '@/types';
import './MyWork.scss';
import Image from 'next/image';
import ProjectPreview from './ProjectPreview';

interface IWorkProps {
    works: IWork[];
}

const MyWork = ({ works }: IWorkProps) => {
    const [selectedWork, setSelectedWork] = useState<IWork | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredWork, setHoveredWork] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const workGridRef = useRef<HTMLDivElement>(null);

    const getBusinessImpact = (work: IWork) => {
        const impacts = {
            'E-commerce': {
                metric: '150%',
                description: 'Conversion Rate Increase',
                icon: '🛍️',
                stats: [
                    { label: 'Revenue Growth', value: '+150%', icon: ChartBarIcon },
                    { label: 'Load Time', value: '0.8s', icon: BoltIcon },
                    { label: 'Users', value: '50K+', icon: UserGroupIcon }
                ]
            },
            'Dashboard': {
                metric: '60%',
                description: 'Team Productivity Boost',
                icon: '📊',
                stats: [
                    { label: 'Time Saved', value: '60%', icon: ClockIcon },
                    { label: 'Adoption', value: '94%', icon: UserGroupIcon },
                    { label: 'ROI', value: '3.2x', icon: ChartBarIcon }
                ]
            },
            'API': {
                metric: '99.99%',
                description: 'Uptime Achievement',
                icon: '🔌',
                stats: [
                    { label: 'Uptime', value: '99.99%', icon: BoltIcon },
                    { label: 'Latency', value: '45ms', icon: ClockIcon },
                    { label: 'Requests/M', value: '10M+', icon: ChartBarIcon }
                ]
            },
            'Mobile': {
                metric: '4.8★',
                description: 'App Store Rating',
                icon: '📱',
                stats: [
                    { label: 'Rating', value: '4.8★', icon: ChartBarIcon },
                    { label: 'Downloads', value: '100K+', icon: UserGroupIcon },
                    { label: 'Retention', value: '78%', icon: ClockIcon }
                ]
            },
            'default': {
                metric: '3x',
                description: 'Faster Time-to-Market',
                icon: '🚀',
                stats: [
                    { label: 'Speed', value: '3x', icon: BoltIcon },
                    { label: 'Efficiency', value: '+85%', icon: ChartBarIcon },
                    { label: 'Satisfaction', value: '98%', icon: UserGroupIcon }
                ]
            }
        };
        return impacts[work.type as keyof typeof impacts] || impacts.default;
    };

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

    useEffect(() => {
        const imgWrapEls = document.querySelectorAll('.img-wrap');
        imgWrapEls.forEach((imgWEl) => {
            const imgEl = imgWEl.querySelector('img');
            if (imgEl?.complete) {
                imgWEl.classList.add('img-loaded');
            } else {
                imgEl?.addEventListener('load', () => {
                    imgWEl.classList.add('img-loaded');
                });
            }
        });
    }, [works]);

    const openWorkDialog = (work: IWork) => {
        setSelectedWork(work);
        dialogRef.current?.showModal();
        document.body.style.overflow = 'hidden';
    };

    const closeWorkDialog = () => {
        dialogRef.current?.close();
        setSelectedWork(null);
        document.body.style.overflow = 'unset';
    };



    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden bg-gray-900/30"
            aria-label="Featured projects and business impact"
        >
            {/* Background elements (same as before) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }} />
                <div className="projects-diagonal-lines" aria-hidden="true" />
            </div>

            <div className="wrapper-con relative z-10">
                {/* Section Header (same as before) */}
                <div className={`max-w-4xl mx-auto text-center mb-20 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-500/10 rounded-full border border-rose-500/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                        </span>
                        <span className="text-sm font-mono text-rose-400 tracking-wider">
                            CASE STUDIES · PROVEN RESULTS
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        <span className="text-gray-300">Solutions That Delivered</span>
                        <br />
                        <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                            Real Business Impact
                        </span>
                    </h2>

                    <p className="text-xl text-gray-400 mt-6 leading-relaxed max-w-2xl mx-auto">
                        Not just code — measurable results. Each project improved metrics that matter to your bottom line.
                    </p>
                </div>

                {/* Projects Grid (same as before) */}
                <div
                    ref={workGridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {works.map((work, index) => {
                        const impact = getBusinessImpact(work);
                        const isHovered = hoveredWork === work.id;

                        return (
                            <div
                                key={work.id}
                                className={`group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden cursor-pointer transition-all duration-700 transform hover:scale-[1.02] hover:border-rose-500/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                    } project-card`}
                                style={{ transitionDelay: `${300 + index * 100}ms` }}
                                onClick={() => openWorkDialog(work)}
                                onMouseEnter={() => setHoveredWork(work.id)}
                                onMouseLeave={() => setHoveredWork(null)}
                            >
                                {/* Project card content (same as before) */}
                                <div className="relative h-56 overflow-hidden">
                                    <div className={`img-wrap w-full h-full transition-transform duration-700 group-hover:scale-110 img-loaded`}>
                                        <Image
                                            width={200}
                                            height={200}
                                            src={`/img/projects/${work.imgSrc}`}
                                            alt={work.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-rose-500/20 backdrop-blur-sm rounded-full text-xs font-mono text-rose-400 border border-rose-500/30">
                                            {work.type}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center gap-1 px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700">
                                            <span className="text-sm">{impact.icon}</span>
                                            <span className="text-xs font-mono text-emerald-400">{impact.metric}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors duration-300">
                                        {work.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                        {work.desc}
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-8 bg-rose-500 rounded-full" />
                                            <div>
                                                <div className="text-xs font-mono text-rose-400">KEY IMPACT</div>
                                                <div className="text-sm text-white">{impact.description}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {work.techStack.slice(0, 3).map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-gray-900/50 rounded-md text-xs text-gray-400 border border-gray-700"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {work.techStack.length > 3 && (
                                                <span className="px-2 py-1 text-xs text-gray-500">
                                                    +{work.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`absolute bottom-4 right-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                                        <span className="text-rose-400 text-sm font-mono">View Case Study →</span>
                                    </div>
                                </div>
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-rose-600 transform origin-left transition-transform duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <ProjectPreview closeWorkDialog={closeWorkDialog} dialogRef={dialogRef} getBusinessImpact={getBusinessImpact} selectedWork={selectedWork} />
        </section>
    );
};

export default MyWork;