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

const HomePage = () => {
  const { videoResume, social, heroImg, bestSkills, features, works, education, skills, experience, contactImg, contactMessage, email, phone, profession , testimonial } = useStaticData();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      {isLoading ? <Loader text='Loading....' /> : (<>
        <Hero videoResume={videoResume} social={social} bestSkills={bestSkills} heroImg={heroImg} />
        <Feature features={features} />
        <MyWork works={works} />
        <MyResume education={education} experience={experience} skills={skills} />
        <Contact setIsLoading={setIsLoading} contactImg={contactImg} contactMessage={contactMessage} email={email} phone={phone} profession={profession} social={social} />
        <Testimonial testimonial={testimonial} />
      </>)}
    </React.Fragment>
  )
}

export default HomePage;