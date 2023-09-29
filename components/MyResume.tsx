'use client'

import React, { useState, useRef } from 'react';
import portfolio from '../data/portfolio.json';
import { styles } from '@/styles';
import { motion } from 'framer-motion';

const MyResume = () => {
    const [selectedItem, setSelectedItem] = useState<number>(1);

    return (
        <section className={`section-4 my-resume container mx-auto px-4 xl:px-12 2xl:px-4 ${styles.borderLine}`}>
            <motion.h4 initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="uppercase text-rose-600 mt-16">4+ YEARS OF EXPERIENCE</motion.h4>
            <motion.h2 initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.3}} className='capitalize text-4xl md:text-6xl font-bold mt-4'>My Resume</motion.h2>
            <div className="resume-box mt-8" >
                <div className="edu-pro-exp-bar w-full flex flex-col md:flex-row">
                    <div className={`professional-skills w-full md:w-2/6 flex justify-center items-center ${selectedItem === 1 ? 'bg-slate-950' : 'bg-slate-900'} py-4 cursor-pointer`} onClick={(e) => setSelectedItem(1)} ><h2 className='text-xl font-medium'>Education</h2></div>
                    <div className={`education w-full md:w-2/6 flex justify-center items-center ${selectedItem === 2 ? 'bg-slate-950' : 'bg-slate-900'} py-4 cursor-pointer`} onClick={(e) => setSelectedItem(2)} ><h2 className='text-xl font-medium'>Professional Skills</h2></div>
                    <div className={`experience w-full md:w-2/6 flex justify-center items-center ${selectedItem === 3 ? 'bg-slate-950' : 'bg-slate-900'} py-4 cursor-pointer`} onClick={(e) => setSelectedItem(3)} ><h2 className='text-xl font-medium'>Experience</h2></div>
                </div>
                <div className="edu-pro-exp-content">
                    {selectedItem === 1 && (
                        <div className="education-content w-full">
                            <motion.h4 initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="uppercase text-rose-600 mt-8">2004 - 2020</motion.h4>
                            <motion.h3 initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.3}} className='mt-2 text-2xl font-bold'>Education Qualifications</motion.h3>
                            <div className="educational-item-list flex w-full justify-between flex-wrap mt-4 flex-col md:flex-row">
                                {portfolio.education.map((edu, i) => (<div key={edu.id} className='educational-item w-full md:w-3/6 flex'>
                                    <div className="bars w-1/6 relative h-full">
                                        <motion.div initial={{ height: 0 }} whileInView={{ height: '100%'}} transition={{ delay: 0.2 }} exit={{ height: 0 }} className="vertical-bar border-l border-slate-500 h-full absolute top-0 left-3"></motion.div>
                                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity:  1 }} transition={{ delay: 0.3 }} exit={{ opacity: 0 }} className="circle-on-the-bar h-2 w-2 bg-slate-500 rounded-full absolute top-3 left-2"></motion.div>
                                        <motion.div initial={{ width: 0 }} whileInView={{ width:  '100%' }} transition={{ delay: 0.4 }} exit={{ width: 0 }} className="bar-to-join-right w-full border-t border-slate-500 absolute top-4 left-2 w-11/12"></motion.div>
                                    </div>
                                    <div className="item-content w-5/6 h-full">
                                        <motion.div initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.5}} className="content bg-slate-900 h-10/12 mb-2 md:md-0">
                                            <div className="p-4">
                                                <h3 className='mt-2 text-2xl font-bold'>{edu.title}</h3>
                                                <p>{edu.institution} - ({edu.year})</p>
                                                <p className='px-4 py-2 bg-slate-800 text-rose-600 w-fit'>{edu.score}</p>
                                                <p>{edu.desc}</p>
                                            </div>
                                        </motion.div>
                                        <div className="space bg-transparent h-2/12 text-gray-950">.</div>
                                    </div>
                                </div>))}
                            </div>
                        </div>
                    )}
                    {selectedItem === 2 && (
                        <div className="professional-skills-content w-full">
                            <motion.h4 initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="uppercase text-rose-600 mt-8">Features</motion.h4>
                            <motion.h3 initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.3}} className='mt-2 text-2xl font-bold'>Web Development Skills</motion.h3>
                            <div className="skill-item-list flex w-full justify-between flex-wrap mt-4 flex-col md:flex-row">
                                {portfolio.skills.map((s) => (<div className='skill-item w-full md:w-5/12 ' key={s.id}>
                                    <p className='mt-3'>{s.title} <span className='float-right'>{s.percent}%</span></p>
                                    <div className="w-full bg-slate-500 h-2">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.percent}%` }} transition={{duration: 1}} exit={{width: 0}} className="h-2 bg-rose-600" ></motion.div>
                                    </div>
                                </div>))}
                            </div>
                        </div>
                    )}
                    {selectedItem === 3 && (
                        <div className="experience-content w-full">
                            <motion.h4 initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="uppercase text-rose-600 mt-8">2020 - 2024</motion.h4>
                            <motion.h3 initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.3}} className='mt-2 text-2xl font-bold'>Job Experience</motion.h3>
                            <div className="experience-item-list flex w-full justify-between flex-wrap mt-4">
                                {portfolio.experience.map((exp) => (<div key={exp.id} className='experience-item w-full md:w-3/6 flex'>
                                    <div className="bars w-1/6 relative h-full">
                                        <motion.div initial={{ height: 0 }} animate={{ height: '100%'}} transition={{ delay: 0.2 }} exit={{ height: 0 }} className="vertical-bar border-l border-slate-500 h-full absolute top-0 left-3"></motion.div>
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1}} transition={{ delay: 0.3 }} exit={{ opacity: 0 }} className="circle-on-the-bar h-2 w-2 bg-slate-500 rounded-full absolute top-3 left-2"></motion.div>
                                        <motion.div initial={{ width: 0 }} animate={{ width: '100%'}} transition={{ delay: 0.4 }} exit={{ width: 0 }} className="bar-to-join-right w-full border-t border-slate-500 absolute top-4 left-2 w-11/12"></motion.div>
                                    </div>
                                    <div className="item-content w-5/6 h-full">
                                        <motion.div initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.5}} className="content bg-slate-900 h-10/12 mb-2 md:md-0">
                                            <div className="p-4">
                                                <h3 className='mt-2 text-2xl font-bold'>{exp.title}</h3>
                                                <p>{exp.institution} - ({exp.year})</p>
                                                <p>{exp.desc}</p>
                                            </div>
                                        </motion.div>
                                        <div className="space bg-transparent h-2/12 text-gray-950">.</div>
                                    </div>
                                </div>))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default MyResume;