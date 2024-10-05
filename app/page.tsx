/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react';
import Feature from '@/components/Features/Features';
import Loader from '@/components/Loader/Loader';
import Hero from '@/components/Hero/Hero';
import { useStaticData } from '@/context/StaticDataProvider';
import MyWork from '@/components/MyWorks/MyWork';
import MyResume from '@/components/MyResume/MyResume';
import Contact from '@/components/Contract/Contact';
import Testimonial from '@/components/Testimonial/Testimonial';
import Acheivements from '@/components/Achievement/Achievement';
import "./Home.scss";

/**
  Inspirations
  Menu, Achievements, Loader -> https://uithemez.com/i/hubfolio_HTML/digital_studio/index.html
  Paralox, Box style -> https://preview.themeforest.net/item/inbio-personal-portfolio-wordpress-theme/full_screen_preview/39221039?_ga=2.106574662.451309780.1727758397-1871772981.1710479217
  Hover animation -> https://gerold.themejunction.net/
 */

const HomePage = () => {
  const { videoResume, social, heroImg, bestSkills, features, works, education, skills, experience, contactImg, contactMessage, email, phone, profession, testimonial, achievements } = useStaticData();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  if (isLoading) return <Loader text='Loading....' />;
  return (
    <React.Fragment>
      <div className="hero-wrapper relative w-full h-auto">
        <Hero videoResume={videoResume} social={social} bestSkills={bestSkills} heroImg={heroImg} />
        {/* Set background  */}
      </div>
      {/* // Acheivements */}
      <div className="achievement-wrapper relative w-full h-auto">
        <Acheivements acheivements={achievements} />
      </div>
      <Feature features={features} />
      <MyWork works={works} />
      <MyResume education={education} experience={experience} skills={skills} />
      <Contact setIsLoading={setIsLoading} contactImg={contactImg} contactMessage={contactMessage} email={email} phone={phone} profession={profession} social={social} />
      <Testimonial testimonial={testimonial} />
    </React.Fragment>
  )
}

export default HomePage;