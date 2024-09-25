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

const HomePage = () => {
  const { videoResume, social, heroImg, bestSkills, features, works, education, skills, experience, contactImg, contactMessage, email, phone, profession, testimonial, achievements } = useStaticData();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  if (isLoading) return <Loader text='Loading....' />;
  return (
    <React.Fragment>
      <div className="hero-wrapper relative w-full h-auto">
        <div className="hero static">
          <Hero videoResume={videoResume} social={social} bestSkills={bestSkills} heroImg={heroImg} />
        </div>
        <img src='/img/bg/reactangle-with-many-dots.svg' className='w-24 absolute end-12 top-12 z-10' loading='lazy' />
        
        <img src='/img/bg/rose-line.svg' className='w-12 absolute z-10 g-1 g-1-l-1' loading='lazy' />
        <img src='/img/bg/white-line.svg' className='w-12 absolute z-10 g-1 g-1-l-2' loading='lazy' />

        <img src='/img/bg/rose-line.svg' className='w-12 absolute z-10 g-2 g-2-l-1'  loading='lazy' />
        <img src='/img/bg/white-line.svg' className='w-12 absolute z-10 g-2 g-2-l-2' loading='lazy' />

        <img src='/img/bg/rose-circle.svg' className='w-32 absolute z-10 g-3 g-3-c-1' loading='lazy' />
        {/* Set background  */}
      </div>
      {/* // Acheivements */}
      <Acheivements acheivements={achievements} />
      <Feature features={features} />
      <MyWork works={works} />
      <MyResume education={education} experience={experience} skills={skills} />
      <Contact setIsLoading={setIsLoading} contactImg={contactImg} contactMessage={contactMessage} email={email} phone={phone} profession={profession} social={social} />
      <Testimonial testimonial={testimonial} />
    </React.Fragment>
  )
}

export default HomePage;