"use client"

import React from 'react';
import Feature from '@/components/Features/Features';
import MyWork from '@/components/MyWorks/MyWork';
import Contact from '@/components/Contract/Contact';
import Loader from '@/components/Loader/Loader';
import Hero from '@/components/Hero/Hero';
import MyResume from '@/components/MyResume/MyResume';
import Testimonial from '@/components/Testimonial/Testimonial';

const HomePage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handlerSetIsLoading = (newIsLoading: boolean) => {
    setIsLoading(newIsLoading);
  }
  return (
    <>
      {isLoading ? <Loader text='Loading....' /> : (<>
        <Hero isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        {/* <Feature isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        <MyWork isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        <MyResume isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        <Contact isLoading={isLoading} setIsLoading={handlerSetIsLoading} />
        <Testimonial isLoading={isLoading} setIsLoading={handlerSetIsLoading} /> */}
      </>)}
    </>
  )
}

export default HomePage;