import React from 'react';
import Hero from '@/components/Hero';
import Feature from '@/components/Features';
import MyWork from '@/components/MyWork';
import MyResume from '@/components/MyResume';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <MyWork />
      <MyResume />
    </div>
  )
}

export default HomePage;