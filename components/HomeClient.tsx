"use client"

import React, { lazy, Suspense, useState } from 'react';
import Hero from '@/components/Hero/Hero';
import { useStaticData } from '@/lib/StaticDataProvider';
import "./Home.scss";
import Acheivements from './Achievement/Achievement';
import Features from './Features/Features';
import MyWork from './MyWorks/MyWork';
import MyResume from './MyResume/MyResume';
import Testimonial from './Testimonial/Testimonial';
import Contact from './Contract/Contact';

// Eagerly load above-the-fold content, lazy-load everything below
// const Feature      = lazy(() => import('@/components/Features/Features'));
// const MyWork       = lazy(() => import('@/components/MyWorks/MyWork'));
// const MyResume     = lazy(() => import('@/components/MyResume/MyResume'));
// const Contact      = lazy(() => import('@/components/Contract/Contact'));
// const Testimonial  = lazy(() => import('@/components/Testimonial/Testimonial'));
// const Acheivements = lazy(() => import('@/components/Achievement/Achievement'));
// const Loader       = lazy(() => import('@/components/Loader/Loader'));



export default function HomeClient() {
  const {
    videoResume, social, heroImg, bestSkills,
    features, works, education, skills, experience,
    contactImg, contactMessage, email, phone, profession,
    testimonial, achievements,
    roles, stats, tags, valueProps
  } = useStaticData();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {/* Hero — no extra wrapper divs or decorative SVGs that delay LCP */}
      <Hero
        videoResume={videoResume}
        social={social}
        bestSkills={bestSkills}
        heroImg={heroImg}
        roles={roles}
        stats={stats}
        tags={tags}
        valueProps={valueProps}
      />

      {/* Proof points — wins & impact numbers */}
      <Acheivements achievements={achievements} />

      {/* What I offer your company */}
      <Features features={features} />

      {/* Evidence — shipped projects */}
      <MyWork works={works} />

      {/* Background — experience & skills that matter to your team */}
      <MyResume education={education} experience={experience} skills={skills} />

      {/* Let's talk — contact form */}
      <Contact
        contactImg={contactImg}
        contactMessage={contactMessage}
        email={email}
        phone={phone}
        profession={profession}
        social={social}
        setIsLoading={setIsLoading}
      />

      {/* Social proof — what past clients say */}
      <Testimonial testimonial={testimonial} />
    </>
  );
}