'use client'

import React, { useEffect, useState } from 'react';
import { IBestSkill, ISocial, IStats, IValueProps } from '@/types';

interface IHeroProps {
  videoResume: string;
  social: ISocial[];
  bestSkills: IBestSkill[];
  heroImg: string;
  roles: string[];
  valueProps: IValueProps[];
  tags: string[];
  stats: IStats[];
}

// Typewriter — client-benefit framing


function TypedRole({roles}: {roles: string[]}) {
  const [idx, setIdx]       = useState(0);
  const [text, setText]     = useState('');
  const [deleting, setDel]  = useState(false);

  useEffect(() => {
    const word = roles[idx];
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
          setIdx((i) => (i + 1) % roles.length);
        }
      },
      deleting ? 25 : 55
    );
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span className="text-rose-500">
      {text}
      <span className="hero-caret" aria-hidden="true" />
    </span>
  );
}

function RemoteBadge() {
  return (
    <span className="remote-badge" role="status">
      <span className="ping-dot" aria-hidden="true">
        <span className="ping-inner" />
        <span className="ping-core" />
      </span>
      Open to Remote Roles — Worldwide
    </span>
  );
}


const Hero = ({ videoResume, social, bestSkills, heroImg, roles, valueProps, tags, stats }: IHeroProps) => {


  return (
    <section className="hero-section" aria-label="Introduction — What I can do for your company">

      {/* Decorative layers */}
      <div className="hero-grid-bg"   aria-hidden="true" />
      <div className="hero-glow-tl"   aria-hidden="true" />
      <div className="hero-glow-br"   aria-hidden="true" />
      <div className="hero-vline"     aria-hidden="true" />

      {/* Main layout */}
      <div className="hero-inner">

        {/* ── LEFT ────────────────────────────────────────── */}
        <div className="hero-left">

          <div className="hero-fade hero-fade-1">
            <RemoteBadge />
          </div>

          <div className="hero-fade hero-fade-2">
            <p className="hero-eyebrow">Senior Full-Stack Developer · 6+ Years</p>
            <h1 className="hero-name">
              Md Samsuzzoha<br />
              <span className="hero-name-accent">Shayon</span>
            </h1>
            <h2 className="hero-role" aria-live="polite">
              <TypedRole roles={roles} />
            </h2>
          </div>

          {/* Client-first value proposition */}
          <div className="hero-fade hero-fade-3 hero-value-props">
            {valueProps.map((v, _i) => (
              <div key={_i} className="value-prop">
                <span className="value-icon" aria-hidden="true">{v.icon}</span>
                <span className="value-text">{v.name}</span>
              </div>
            ))}
          </div>

          {/* Bio — framed around client benefit */}
          <p className="hero-fade hero-fade-3 hero-bio">
            Your next remote senior developer. I design and build production systems
            on <strong>Node.js, Next.js &amp; PostgreSQL</strong> — architected for
            scale, maintained like a professional, and delivered async without the
            timezone headaches. Let me solve your hardest developering problems.
          </p>

          {/* Tech stack */}
          <div className="hero-fade hero-fade-3 hero-tags" aria-label="Core technologies">
            {tags.map((tag) => (
              <span key={tag} className="hero-tag">{tag}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-fade hero-fade-4 hero-ctas">
            <a
              href="#contact"
              className="btn-primary"
              aria-label="Hire me for a remote role"
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Hire Me Remotely
            </a>
            <a
              href={videoResume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="Watch video resume"
            >
              <svg className="btn-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Video Resume
            </a>
          </div>

          {/* Social */}
          <div className="hero-fade hero-fade-4 hero-social">
            <span className="social-label">Find me on</span>
            <div className="social-rule" aria-hidden="true" />
            <div className="social-icons" role="list">
              {social.map((s) => (
                <a
                  key={s.id}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${s.name} profile`}
                  className="social-icon-btn"
                  role="listitem"
                >
                  <img src={`/icons/${s.icon}`} alt={s.name} className="social-icon-img" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT — photo ──────────────────────────────── */}
        <div className="hero-fade hero-fade-2 hero-right">
          <div className="photo-frame">

            {/* Corner brackets */}
            <div className="corner tl" aria-hidden="true" />
            <div className="corner br" aria-hidden="true" />

            {/* XP badge */}
            <div className="xp-badge" aria-label="6+ years of remote experience">
              <span className="xp-number">6+</span>
              <span className="xp-label">yrs<br />remote</span>
            </div>

            {/* "Available now" badge */}
            <div className="available-badge" aria-label="Currently available">
              <span className="avail-dot" aria-hidden="true" />
              Available Now
            </div>

            <img
              src={heroImg}
              alt="Md Samsuzzoha Shayon — Senior Full-Stack Developer available for remote work"
              className="photo-img"
              loading="eager"
              fetchPriority="high"
            />
            <div className="photo-overlay" aria-hidden="true" />

            {/* Skills float */}
            <div className="skills-float" aria-label="Top technologies">
              {bestSkills.map((skill) => (
                <div key={skill.id} className="skill-chip">
                  <img src={`/icons/${skill.icon}`} alt="" className="skill-icon" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <nav className="hero-stats-bar" aria-label="Career statistics">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </nav>

    </section>
  );
};

export default Hero;