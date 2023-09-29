'use client'

import React, { useEffect, useState } from 'react';
import portfolio from '../data/portfolio.json';
import SocialMedia from './SocialMedia';
import { styles } from '@/styles';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className={`section-1 hero container mx-auto px-4 xl:px-12 2xl:px-4 flex justify-between flex-col-reverse md:flex-row items-center ${styles.borderLine}`}>
            <div className="w-full md:w-7/12 flex flex-col items-start justify-between gap-12 md:gap-32 h-full">
                <div className="headings w-full">
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${styles.sectionHeading} mt-8 relative`}>WELCOME TO MY WORLD</motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative capitalize text-4xl md:text-6xl font-bold mt-4">I&apos;m Md Samsuzzoha Shayon</motion.h1>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`relative capitalize text-rose-600 ${styles.h2}`}>
                        A fullstack web developer</motion.h1>
                    <div className="button flex gap-2 mt-8">
                        <button type='button' className="w-32 bg-rose-600 text-slate-50 capitalize h-10">Video Resume</button>
                        <button type='button' className="w-32 bg-rose-600 text-slate-50 capitalize h-10">Get In Touch</button>
                    </div>
                    {/* <motion.p initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.5}} className='mt-4 relative'>I have a passion for creating responsive and user-friendly web applications, and I enjoy solving complex problems to deliver efficient and effective digital solutions. My skills include proficiency in various programming languages, frameworks, and tools to build robust and dynamic websites. With a strong commitment to staying up-to-date with the latest industry trends and technologies, I am always eager to take on new challenges in the ever-evolving world of web development.</motion.p> */}
                </div>
                <div className="social-skills flex flex-col md:flex-row gap-4 justify-between w-ful w-full">
                    <div className="social">
                        <SocialMedia social={portfolio.social} />
                    </div>
                    <div className="skills">
                        <motion.h2 className='mb-4 uppercase font-bold relative' initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} >Best Skill on</motion.h2>
                        <ul className='flex w-full gap-2'>
                            {portfolio.bestSkills.map((skill) => (
                                <motion.li key={skill.id} initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05, type: 'spring', stiffness: 100 }} className={`${styles.shadow} ${styles.bg_1} h-12 w-12 flex justify-center items-center`}><img src={`/icons/${skill.icon}`} className='h-6' alt="" /></motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-5/12 flex justify-end">
                <div className="img-bg right-img-bg flex justify-center relative">
                    <motion.img initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, type: 'spring', stiffness: 100 }} exit={{ opacity: 0 }} src={portfolio.heroImg} alt="shayon hero image" className='absolute h-full w-full md:w-5/6 object-top md:object-fit object-cover top-0 left-0 md:left-7 z-10' />
                    <div className="img-ground w-full h-5/6 absolute bottom-0 z-0 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 shadow-lg shadow-slate-900/50"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero;