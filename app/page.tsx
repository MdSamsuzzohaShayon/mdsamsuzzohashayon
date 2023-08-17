import React from 'react';
import Hero from '@/components/Hero';
import Feature from '@/components/Features';
import MyWork from '@/components/MyWork';
import MyResume from '@/components/MyResume';
import Contact from '@/components/Contact';
import Testimonial from '@/components/Testimonial';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Feature />
      <MyWork />
      <MyResume />
      <Contact />
      <Testimonial />
    </>
  )
}

export default HomePage;