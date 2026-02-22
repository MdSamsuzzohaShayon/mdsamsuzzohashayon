import { IWork } from '@/types';
import { ArrowTopRightOnSquareIcon, BoltIcon, ChartBarIcon, ClockIcon, CodeBracketIcon, PlayCircleIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react'

interface IProjectPreviewProps {
    dialogRef: React.RefObject<HTMLDialogElement | null>;
    selectedWork: IWork | null;
    closeWorkDialog: () => void;
    getBusinessImpact: (work: IWork) => void;
}

function ProjectPreview({ dialogRef, selectedWork, closeWorkDialog, getBusinessImpact }: IProjectPreviewProps) {
    const handleDialogClick = (e: React.MouseEvent) => {
        if (dialogRef.current && e.target === dialogRef.current) {
            closeWorkDialog();
        }
    };



    return (

        <dialog
            ref={dialogRef}
            className="fixed inset-0 w-full h-full bg-transparent backdrop:bg-gray-900/95 backdrop:backdrop-blur-xl open:flex open:items-center open:justify-center"
            onClick={handleDialogClick}
            aria-label="Project details"
            style={{ padding: 0 }}
        >
            {selectedWork && (
                <div className="relative w-full max-w-6xl max-h-[90vh] mx-4 overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl">
                    {/* Modal Header with Corner Brackets */}
                    <div className="relative">
                        {/* Corner decorations - matching Hero component */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-rose-500/30 rounded-tl-3xl pointer-events-none" aria-hidden="true" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-rose-500/30 rounded-tr-3xl pointer-events-none" aria-hidden="true" />

                        {/* Header Content */}
                        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 p-6 flex justify-between items-center z-10">
                            <div className="flex items-center gap-4">
                                {/* Project Type Badge with ping dot */}
                                <div className="relative">
                                    <span className="relative flex h-3 w-3 absolute -top-1 -right-1">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                                    </span>
                                    <span className="px-4 py-2 bg-rose-500/10 rounded-xl text-sm font-mono text-rose-400 border border-rose-500/20">
                                        {selectedWork.type}
                                    </span>
                                </div>
                                <span className="text-gray-400 text-sm">· Case Study</span>
                            </div>

                            {/* Close button - matching Hero's aesthetic */}
                            <button
                                onClick={closeWorkDialog}
                                className="group relative w-12 h-12 rounded-xl bg-gray-800/50 hover:bg-gray-800 flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-rose-500/30"
                                aria-label="Close modal"
                            >
                                <XMarkIcon className="w-5 h-5 text-gray-400 group-hover:text-rose-400 transition-colors duration-300" />
                                <span className="absolute inset-0 rounded-xl bg-rose-500/0 group-hover:bg-rose-500/5 transition-colors duration-300" />
                            </button>
                        </div>
                    </div>

                    {/* Modal Content - Scrollable Area */}
                    <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                        <div className="p-8 md:p-10">
                            {/* Hero-style grid background inside modal */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
                                backgroundSize: '32px 32px'
                            }} />

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Left Column - Image & Impact */}
                                <div>
                                    {/* Image with frame - matching Hero's photo-frame style */}
                                    <div className="relative photo-frame mb-8">
                                        <div className="corner tl" aria-hidden="true" />
                                        <div className="corner br" aria-hidden="true" />

                                        <div className="relative rounded-2xl overflow-hidden bg-gray-800">
                                            <Image
                                                src={`/img/projects/${selectedWork.imgSrc}`}
                                                alt={selectedWork.title}
                                                width={600}
                                                height={400}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>

                                        {/* Impact badge - like xp-badge */}
                                        <div className="absolute top-4 right-4 xp-badge">
                                            {/* <span className="xp-number">{getBusinessImpact(selectedWork).metric}</span>
                                            <span className="xp-label">impact<br />gain</span> */}
                                        </div>
                                    </div>

                                    {/* Impact Stats - matching stats bar design */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {/* {getBusinessImpact(selectedWork).stats.map((stat, idx) => {
                                            const Icon = stat.icon;
                                            return (
                                                <div key={idx} className="stat-card bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                                                    <Icon className="w-5 h-5 text-rose-400 mb-2" />
                                                    <span className="stat-value block text-lg font-bold text-white">{stat.value}</span>
                                                    <span className="stat-label text-xs text-gray-400">{stat.label}</span>
                                                </div>
                                            );
                                        })} */}
                                    </div>

                                    {/* Tech Stack Pills */}
                                    <div className="bg-gray-800/20 rounded-xl p-6 border border-gray-700/50">
                                        <h4 className="text-sm font-mono text-rose-400 mb-4 flex items-center gap-2">
                                            <span className="w-1 h-4 bg-rose-500 rounded-full" />
                                            TECHNOLOGY STACK
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedWork.techStack.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-gray-800 rounded-xl text-sm text-gray-300 border border-gray-700 hover:border-rose-500/30 transition-colors duration-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Details */}
                                <div>
                                    {/* Title with gradient */}
                                    <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                                        <span className="text-gray-300">{selectedWork.title}</span>
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                        {selectedWork.desc}
                                    </p>

                                    {/* Key Features Section */}
                                    {selectedWork.features && selectedWork.features.length > 0 && (
                                        <div className="mb-8">
                                            <h4 className="text-sm font-mono text-rose-400 mb-4 flex items-center gap-2">
                                                <span className="w-1 h-4 bg-rose-500 rounded-full" />
                                                KEY FEATURES
                                            </h4>
                                            <ul className="grid grid-cols-1 gap-3">
                                                {selectedWork.features.map((feature, index) => (
                                                    <li key={index} className="flex items-center gap-3 text-gray-300 bg-gray-800/20 p-3 rounded-lg border border-gray-700/50">
                                                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Action Buttons - matching Hero's CTA style */}
                                    <div className="flex flex-wrap gap-4 mt-8">
                                        <a
                                            href={selectedWork.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
                                        >
                                            <PlayCircleIcon className="w-5 h-5" />
                                            Live Demo
                                        </a>
                                        <a
                                            href={selectedWork.srcCode}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-white font-medium rounded-xl border border-gray-700 hover:border-rose-500/50 hover:bg-gray-800/80 transition-all duration-300"
                                        >
                                            <CodeBracketIcon className="w-5 h-5" />
                                            Source Code
                                        </a>
                                        {selectedWork.vidUrl && (
                                            <a
                                                href={selectedWork.vidUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800/50 text-white font-medium rounded-xl border border-gray-700 hover:border-rose-500/50 hover:bg-gray-800/80 transition-all duration-300"
                                            >
                                                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                                Video Walkthrough
                                            </a>
                                        )}
                                    </div>

                                    {/* Additional metadata - like remote badge */}
                                    <div className="mt-8 flex items-center gap-3 p-4 bg-gray-800/20 rounded-xl border border-gray-700/50">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            Project completed · Production ready · Fully documented
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </dialog>

    )
}

export default ProjectPreview;