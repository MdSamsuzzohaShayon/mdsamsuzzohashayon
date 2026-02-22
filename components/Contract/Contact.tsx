// components/Contact/Contact.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { IMessageData, ISocial } from '@/types';

interface IContactProps {
    contactImg: string;
    profession: string;
    contactMessage: string;
    email: string;
    phone: string;
    social: ISocial[];
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Typewriter effect for response guarantee
const RESPONSE_GUARANTEES = [
    'I respond within 24 hours',
    'Your timezone is respected',
    'Clear communication always',
    'No delays, no excuses',
];

function TypedResponse() {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState('');
    const [deleting, setDel] = useState(false);

    useEffect(() => {
        const word = RESPONSE_GUARANTEES[idx];
        const t = setTimeout(
            () => {
                if (!deleting && text.length < word.length) {
                    setText(word.slice(0, text.length + 1));
                } else if (!deleting && text.length === word.length) {
                    setTimeout(() => setDel(true), 2200);
                } else if (deleting && text.length > 0) {
                    setText(text.slice(0, -1));
                } else {
                    setDel(false);
                    setIdx((i) => (i + 1) % RESPONSE_GUARANTEES.length);
                }
            },
            deleting ? 25 : 55
        );
        return () => clearTimeout(t);
    }, [text, deleting, idx]);

    return (
        <span className="text-rose-500">
            {text}
            <span className="ml-0.5 animate-pulse">|</span>
        </span>
    );
}

function AvailabilityBadge() {
    return (
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 rounded-full border border-rose-500/20" role="status">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-sm font-mono text-rose-400 tracking-wider">Available for Remote Work — Worldwide</span>
        </span>
    );
}

const STATS = [
    { value: '<24h', label: 'Response Time' },
    { value: '100+', label: 'Projects Discussed' },
    { value: '50+', label: 'Happy Clients' },
    { value: '🌍', label: 'Global Support' },
];

const Contact = ({ contactImg, profession, contactMessage, email, phone, setIsLoading, social }: IContactProps) => {
    const initialMsgData = {
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
    };
    
    const [msgData, setMsgData] = useState<IMessageData>(initialMsgData);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const dialogModalEl = useRef<null | HTMLDialogElement>(null);

    const sendMessageHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            setIsLoading(true);
            const response = await fetch('https://shayon-flask-demo-app.azurewebsites.net/api/sendemail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msgData)
            });
            
            if (response.status === 201) {
                setSuccessMessage("Thank you! Your message has been sent. I'll respond within 24 hours.");
                setMsgData(initialMsgData);
                if (dialogModalEl.current) dialogModalEl.current.showModal();
            }
        } catch (error) {
            console.error(error);
            setSuccessMessage("Something went wrong. Please try again or email me directly.");
            if (dialogModalEl.current) dialogModalEl.current.showModal();
        } finally {
            setIsLoading(false);
            setIsSubmitting(false);
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMsgData(prev => ({ ...prev, [name]: value }));
    };

    const dialogElementHandler = (e: React.MouseEvent) => {
        if (!dialogModalEl.current) return;
        const position = dialogModalEl.current.getBoundingClientRect();

        if (
            e.clientX < position.left || e.clientX > position.right ||
            e.clientY < position.top || e.clientY > position.bottom
        ) {
            setSuccessMessage('');
            dialogModalEl.current.close();
        }
    };

    const closeModalHandler = () => {
        setSuccessMessage('');
        if (dialogModalEl.current) dialogModalEl.current.close();
    };

    return (
        <section className="relative min-h-screen bg-[#0a0c10] overflow-hidden py-24 md:py-32">
            {/* Decorative layers - matching hero */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
                <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-rose-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-rose-500/20 to-transparent" />
            </div>

            <div className="relative z-10 w-[90%] md:w-[80%] mx-auto">
                {/* Header Section */}
                <div className="max-w-3xl mb-16">
                    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
                        <AvailabilityBadge />
                    </div>

                    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards] mt-6">
                        <p className="text-sm font-mono text-rose-400 tracking-[0.2em] uppercase mb-3">
                            Let's Work Together · Remote First
                        </p>
                        <h1 className="text-5xl md:text-7xl font-black leading-tight">
                            <span className="text-gray-400">Let's Build</span>
                            <br />
                            <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                                Something Great
                            </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-gray-300 mt-4 h-12" aria-live="polite">
                            <TypedResponse />
                        </h2>
                    </div>
                </div>

                {/* Stats Bar - matching hero */}
                <nav className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 opacity-0 animate-[fadeIn_0.6s_ease-out_0.4s_forwards]" aria-label="Contact statistics">
                    {STATS.map((s) => (
                        <div key={s.label} className="text-center p-4 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
                            <span className="text-2xl font-bold text-rose-400">{s.value}</span>
                            <span className="block text-xs text-gray-500 mt-1">{s.label}</span>
                        </div>
                    ))}
                </nav>

                {/* Main Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Contact Info Card */}
                    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.6s_forwards]">
                        <div className="group relative bg-gray-800/40 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden hover:border-rose-500/30 transition-all duration-300">
                            {/* Photo Frame - matching hero style */}
                            <div className="relative h-80 overflow-hidden">
                                {/* Corner brackets */}
                                <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-rose-500/50 z-10" />
                                <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-rose-500/50 z-10" />
                                
                                <img
                                    src={contactImg}
                                    alt="Contact"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                                
                                {/* Response time badge */}
                                <div className="absolute top-6 left-6 bg-rose-600 rounded-lg p-3 text-center">
                                    <span className="block text-xl font-bold text-white">24h</span>
                                    <span className="block text-[10px] text-rose-200 leading-tight">response<br />time</span>
                                </div>
                                
                                {/* Available badge */}
                                <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    <span className="text-xs font-mono text-emerald-400">Available Now</span>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{profession}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {contactMessage}
                                </p>

                                {/* Contact Methods */}
                                <div className="space-y-3 mb-8">
                                    <a href={`mailto:${email}`} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-rose-500/30 hover:text-rose-400 transition-all duration-300 group">
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm text-gray-300 group-hover:text-white">{email}</span>
                                    </a>
                                    
                                    <a href={`tel:${phone}`} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-rose-500/30 hover:text-rose-400 transition-all duration-300 group">
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="text-sm text-gray-300 group-hover:text-white">{phone}</span>
                                    </a>
                                </div>

                                {/* Social Links - matching hero style */}
                                <div>
                                    <span className="text-xs font-mono text-gray-500 tracking-wider">Find me on</span>
                                    <div className="w-12 h-px bg-rose-500/30 my-3" />
                                    <div className="flex gap-3" role="list">
                                        {social.map((s) => (
                                            <a
                                                key={s.id}
                                                href={s.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit my ${s.name} profile`}
                                                className="group/social relative"
                                                role="listitem"
                                            >
                                                <div className="absolute inset-0 bg-rose-500/20 rounded-xl blur-lg opacity-0 group-hover/social:opacity-100 transition-opacity" />
                                                <div className="relative w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700 group-hover/social:border-rose-500/50 group-hover/social:scale-110 transition-all duration-300">
                                                    <img src={`/icons/${s.icon}`} alt={s.name} className="w-6 h-6 group-hover/social:scale-110 transition-transform" loading="lazy" />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.8s_forwards]">
                        <div className="group relative bg-gray-800/40 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 hover:border-rose-500/30 transition-all duration-300">
                            <form onSubmit={sendMessageHandler} className="space-y-6">
                                {/* Name & Phone Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className={`text-sm font-mono transition-colors duration-300 ${
                                            focusedField === 'name' ? 'text-rose-400' : 'text-gray-500'
                                        }`}>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={msgData.name}
                                            onChange={inputChangeHandler}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full h-12 px-4 bg-gray-900/50 rounded-xl border border-gray-700 text-white outline-none focus:border-rose-500/50 transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className={`text-sm font-mono transition-colors duration-300 ${
                                            focusedField === 'phone' ? 'text-rose-400' : 'text-gray-500'
                                        }`}>
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={msgData.phone}
                                            onChange={inputChangeHandler}
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full h-12 px-4 bg-gray-900/50 rounded-xl border border-gray-700 text-white outline-none focus:border-rose-500/50 transition-all duration-300 remove-arrow"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className={`text-sm font-mono transition-colors duration-300 ${
                                        focusedField === 'email' ? 'text-rose-400' : 'text-gray-500'
                                    }`}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={msgData.email}
                                        onChange={inputChangeHandler}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full h-12 px-4 bg-gray-900/50 rounded-xl border border-gray-700 text-white outline-none focus:border-rose-500/50 transition-all duration-300"
                                        required
                                    />
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <label htmlFor="subject" className={`text-sm font-mono transition-colors duration-300 ${
                                        focusedField === 'subject' ? 'text-rose-400' : 'text-gray-500'
                                    }`}>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={msgData.subject}
                                        onChange={inputChangeHandler}
                                        onFocus={() => setFocusedField('subject')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full h-12 px-4 bg-gray-900/50 rounded-xl border border-gray-700 text-white outline-none focus:border-rose-500/50 transition-all duration-300"
                                        required
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label htmlFor="message" className={`text-sm font-mono transition-colors duration-300 ${
                                        focusedField === 'message' ? 'text-rose-400' : 'text-gray-500'
                                    }`}>
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={5}
                                        value={msgData.message}
                                        onChange={inputChangeHandler}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-700 text-white outline-none focus:border-rose-500/50 transition-all duration-300 resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button - matching hero button style */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative w-full group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    <div className="relative flex items-center justify-center gap-3 py-4 text-white font-semibold">
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </div>
                                </button>

                                {/* Trust badge */}
                                <p className="text-xs text-center text-gray-600">
                                    ✦ Your information is secure and will never be shared ✦
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Dialog */}
            <dialog
                ref={dialogModalEl}
                className="bg-transparent backdrop:bg-black/80 backdrop:backdrop-blur-sm open:flex items-center justify-center p-0 mx-auto"
                onClick={dialogElementHandler}
            >
                <div className="relative bg-gray-900 rounded-2xl max-w-md w-full p-8 border border-rose-500/30">
                    <button 
                        onClick={closeModalHandler}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <span className="text-3xl text-emerald-400">✓</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-gray-400 mb-6">{successMessage}</p>
                        
                        <button
                            onClick={closeModalHandler}
                            className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            </dialog>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default Contact;