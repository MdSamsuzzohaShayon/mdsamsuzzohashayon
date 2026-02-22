// components/MyResume/MyResume.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { IEducation, IExperience, ISkill } from '@/types';
import './MyResume.scss'; // For custom infographic styles

interface IMyResumeProps {
    education: IEducation[];
    skills: ISkill[];
    experience: IExperience[];
}

// Business impact metrics
const IMPACT_METRICS = [
    { icon: '🚀', label: 'Projects Delivered', value: '50+' },
    { icon: '💰', label: 'Revenue Generated', value: '$5M+' },
    { icon: '⚡', label: 'Performance Gain', value: '185%' },
    { icon: '🎯', label: 'Success Rate', value: '100%' },
];

const MyResume = ({ education, skills, experience }: IMyResumeProps) => {
    const [activeTab, setActiveTab] = useState<number>(1);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: number }>({});
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

    // Animate skill bars when visible and active tab is skills
    useEffect(() => {
        if (isVisible && activeTab === 2) {
            const timer = setTimeout(() => {
                const newAnimatedSkills: { [key: string]: number } = {};
                skills.forEach(skill => {
                    newAnimatedSkills[skill.id] = skill.percent;
                });
                setAnimatedSkills(newAnimatedSkills);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, activeTab, skills]);

    // Calculate total experience
    const startYear = 2019;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - startYear;

    // Get icon for skill category
    const getSkillCategoryIcon = (category: string) => {
        const icons: { [key: string]: string } = {
            'Frontend': '🎨',
            'Backend': '⚙️',
            'Database': '🗄️',
            'DevOps': '🚀',
            'Tools': '🔧',
            'default': '💻'
        };
        return icons[category] || icons.default;
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden bg-gray-900/30"
            aria-label="Professional background and expertise"
        >
            {/* Hero-style background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-rose-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulse-slower" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }} />

                {/* Decorative lines */}
                <div className="resume-diagonal-lines" aria-hidden="true" />
            </div>

            <div className="wrapper-con relative z-10">
                {/* Section Header */}
                <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-500/10 rounded-full border border-rose-500/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                        </span>
                        <span className="text-sm font-mono text-rose-400 tracking-wider">
                            {yearsOfExperience}+ YEARS · FULL-STACK EXPERTISE
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        <span className="text-gray-300">What I Bring to</span>
                        <br />
                        <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                            Your Engineering Team
                        </span>
                    </h2>
                </div>

                {/* Impact Metrics Strip */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    {IMPACT_METRICS.map((metric, index) => (
                        <div
                            key={metric.label}
                            className="group relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-rose-500/30 transition-all duration-300 text-center"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <span className="text-3xl mb-2 block">{metric.icon}</span>
                            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                            <div className="text-sm text-gray-400">{metric.label}</div>

                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/5 to-rose-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>

                {/* Tab Navigation - Infographic Style */}
                <div className={`mb-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <div className="flex flex-col md:flex-row rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-1">
                        {[
                            { id: 1, label: 'Education', icon: '🎓', desc: 'Academic Background' },
                            { id: 2, label: 'Skills', icon: '⚡', desc: 'Technical Expertise' },
                            { id: 3, label: 'Experience', icon: '💼', desc: 'Work History' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex-1 group px-6 py-4 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-lg shadow-rose-500/25'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-2xl">{tab.icon}</span>
                                    <div className="text-left">
                                        <div className="font-semibold">{tab.label}</div>
                                        <div className={`text-xs ${activeTab === tab.id ? 'text-rose-100' : 'text-gray-500'
                                            }`}>
                                            {tab.desc}
                                        </div>
                                    </div>
                                </div>

                                {/* Active indicator line */}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative min-h-[500px]">
                    {/* Education Tab */}
                    {activeTab === 1 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {education.map((edu, index) => (
                                <div
                                    key={edu.id}
                                    className={`group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-700 transform hover:scale-[1.02] hover:border-rose-500/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                        }`}
                                    style={{ transitionDelay: `${500 + index * 100}ms` }}
                                >
                                    {/* Timeline decoration */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-rose-600" />

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <span className="inline-block px-3 py-1 bg-rose-500/20 rounded-full text-xs font-mono text-rose-400 mb-3">
                                                    {edu.year}
                                                </span>
                                                <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors duration-300">
                                                    {edu.title}
                                                </h3>
                                                <p className="text-gray-400 mt-1">{edu.institution}</p>
                                            </div>
                                            <span className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                                                🎓
                                            </span>
                                        </div>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                            {edu.desc}
                                        </p>

                                        {/* Score badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-700">
                                            <span className="text-rose-400 font-mono font-bold">{edu.score}</span>
                                            <span className="text-xs text-gray-500">GPA</span>
                                        </div>
                                    </div>

                                    {/* Hover shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === 2 && (
                        <div className="space-y-8">
                            {/* Skills categories */}
                            <div
                                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                // style={{ transitionDelay: `${600 + categoryIndex * 100}ms` }}
                            >
                                {/* <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{getSkillCategoryIcon(category)}</span>
                                    <h3 className="text-lg font-semibold text-white">{category}</h3>
                                    <div className="flex-1 h-px bg-gradient-to-r from-rose-500/30 to-transparent" />
                                </div> */}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {skills.map((skill, index) => (
                                        <div
                                            key={skill.id}
                                            className="group relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-rose-500/30 transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-300 font-medium">{skill.title}</span>
                                                <span className="text-rose-400 font-mono font-bold">
                                                    {animatedSkills[skill.id] || 0}%
                                                </span>
                                            </div>

                                            {/* Skill progress bar */}
                                            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${animatedSkills[skill.id] || 0}%` }}
                                                />

                                                {/* Animated glow */}
                                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            </div>

                                            {/* Expertise level indicator */}
                                            <div className="mt-2 flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1 w-5 rounded-full transition-all duration-300 ${level <= Math.ceil(skill.percent / 20)
                                                                ? 'bg-rose-500'
                                                                : 'bg-gray-700'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Skill impact summary */}
                            <div className={`mt-8 p-6 bg-gradient-to-r from-rose-500/10 to-transparent rounded-2xl border border-rose-500/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`} style={{ transitionDelay: '1000ms' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">Full-Stack Proficiency</h4>
                                        <p className="text-sm text-gray-400">
                                            Comprehensive expertise across the entire development lifecycle
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="text-3xl font-bold text-rose-400">95%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Experience Tab */}
                    {activeTab === 3 && (
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/50 via-rose-500/20 to-transparent" />

                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div
                                        key={exp.id}
                                        className={`group relative pl-16 transition-all duration-700 transform hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                            }`}
                                        style={{ transitionDelay: `${600 + index * 150}ms` }}
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-4 top-6 w-8 h-8 bg-gray-800 rounded-full border-2 border-rose-500/50 group-hover:border-rose-500 group-hover:scale-110 transition-all duration-300">
                                            <div className="absolute inset-2 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        {/* Content card */}
                                        <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 overflow-hidden group-hover:border-rose-500/30">
                                            {/* Year badge */}
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 bg-rose-500/20 rounded-full text-xs font-mono text-rose-400">
                                                    {exp.year}
                                                </span>
                                            </div>

                                            <div className="pr-20">
                                                <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors duration-300">
                                                    {exp.title}
                                                </h3>
                                                <p className="text-rose-400/80 text-sm mt-1">{exp.institution}</p>

                                                <p className="text-gray-400 mt-4 leading-relaxed">
                                                    {exp.desc}
                                                </p>

                                                {/* Key achievements (if available) */}
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    <span className="px-2 py-1 bg-gray-900/50 rounded-md text-xs text-gray-400 border border-gray-700">
                                                        🏆 Key Contributor
                                                    </span>
                                                    <span className="px-2 py-1 bg-gray-900/50 rounded-md text-xs text-gray-400 border border-gray-700">
                                                        📈 Promoted
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Hover shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className={`mt-16 text-center transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
                    >
                        <span>Hire a Senior Developer</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <p className="text-sm text-gray-500 mt-4">
                        {yearsOfExperience}+ years of production experience · Available for remote roles
                    </p>
                </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
        </section>
    );
};

export default MyResume;