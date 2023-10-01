"use client"

import React from 'react';
import Hero from '@/components/Hero';
import Feature from '@/components/Features';
import MyWork from '@/components/MyWork';
import MyResume from '@/components/MyResume';
import Contact from '@/components/Contact';
import Testimonial from '@/components/Testimonial';
import Loader from '@/components/Loader';

const HomePage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handlerSetIsLoading = (newIsLoading: boolean) => {
    setIsLoading(newIsLoading);
  }
  return (
    <>
      {isLoading ? <Loader text='Loading....' /> : (<>
        <Hero isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        <Feature isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        <MyWork isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        <MyResume isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        <Contact isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        <Testimonial isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
      </>)}
    </>
  )
}

export default HomePage;