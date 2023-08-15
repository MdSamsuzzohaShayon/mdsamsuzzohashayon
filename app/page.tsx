import React from 'react';
import Hero from '@/components/Hero';
import Feature from '@/components/Features';
import MyWork from '@/components/MyWork';
import MyResume from '@/components/MyResume';
import Contact from '@/components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Feature />
      <MyWork />
      <MyResume />
      <Contact />
      <br /><br /><br /><br /><br />
    </>
  )
}

export default HomePage;