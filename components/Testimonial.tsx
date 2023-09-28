'use client'

import React, { useState, useRef, useEffect } from 'react';
import portfolio from '../data/portfolio.json';
import { styles } from '@/styles';
import { motion } from 'framer-motion';


const Testimonial = () => {

    const [testimonialList, setTestimonialList] = useState(portfolio.testimonial);
    const [selectedTestimonialId, setSelectedTestimonialId] = useState<number>(1);
    const [isLeft, setIsLeft] = useState<boolean>(false);

    // Handlers
    const testItemChangeHandler = (e: React.SyntheticEvent, targetId: number) => {
        e.preventDefault();
        setSelectedTestimonialId(targetId);
    }
    const leftArrowItemHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLeft(true);
        setSelectedTestimonialId((prevState) => prevState === 1 ? testimonialList.length : prevState - 1);
    }
    const rightArrowItemHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLeft(false);
        setSelectedTestimonialId((prevState) => prevState === testimonialList.length ? 1 : prevState + 1);
    }

    const makeStars = (totalStars: number, num: number) => {
        if (num === 0) return null;
        const stars: React.ReactNode[] = []
        for (let i = 0; i < totalStars; i++) {
            let imgSrc = i < num ? '/icons/star-filled.svg' : '/icons/star-blank.svg';
            stars.push(<img key={i} src={imgSrc} className='h-8 w-8' />);
        }
        return <div className='flex items-center'> {stars} </div>;
    }

    const makeButtons = () => {
        const btnList: React.ReactNode[] = [];
        for (let index = 0; index < testimonialList.length; index++) {
            if (testimonialList[index].id === selectedTestimonialId) {
                btnList.push(<button key={index} className="h-4 w-4 bg-rose-600 rounded-full" onClick={(e) => testItemChangeHandler(e, testimonialList[index].id)}></button>);
            } else {
                btnList.push(<button key={index} className="h-4 w-4 bg-slate-600 rounded-full" onClick={(e) => testItemChangeHandler(e, testimonialList[index].id)} ></button>);
            }
        }
        return <div className="content-controller w-full flex gap-2 mt-4 justify-center items-center">{btnList}</div>;
    }

    const testimonialTouchStartHandler = (e: React.SyntheticEvent) => {
        console.log("Start - ", e);
    }
    const testimonialTouchMoveHandler = (e: React.SyntheticEvent) => {
        console.log("Move - ", e);
    }
    const testimonialTouchEndHandler = (e: React.SyntheticEvent) => {
        console.log("End - ", e);
    }
    const testimonialTouchCancelHandler = (e: React.SyntheticEvent) => {
        console.log("Cancel - ", e);
    }

    return (
        <section className={`section-6 testimonial container mx-auto px-12 ${styles.borderLine}`}  >
            <motion.h4 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="uppercase text-rose-600 mt-16 relative">WHAT CLIENTS SAY</motion.h4>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className='capitalize text-4xl md:text-6xl font-bold mt-4 relative'>Testimonial</motion.h2>
            <div className="content flex" >
                {testimonialList.map((testimonial, i) => {
                    if (selectedTestimonialId === testimonial.id) {
                        return (
                            <motion.div
                                onTouchStart={testimonialTouchStartHandler}
                                onTouchMove={testimonialTouchMoveHandler}
                                onTouchEnd={testimonialTouchEndHandler}
                                onTouchCancel={testimonialTouchCancelHandler}
                                key={testimonial.id} initial={{ opacity: 0, x: isLeft ? 300 : -300 }} whileInView={{ opacity: 1, x: 0 }} exit={{ opacity: 1, x: isLeft ? -300 : 300 }} transition={{ duration: 1 }} className='test-preview w-full mt-4 flex flex-col md:flex-row gap-4 justify-between items-center' >
                                <div className="test-preview-img w-full md:w-2/6 h-full flex flex-col justify-center items-start bg-slate-900">
                                    <div className="p-4">
                                        {testimonial.clientImg ? <img src={testimonial.clientImg} alt={testimonial.client} className="w-3/6 h-32 object-fit object-cover" /> : <div className='flex h-32 items-center'><p className="w-3/6" >No Image Available</p></div>}
                                        <h2 className={`${styles.h2} mt-4`}>{testimonial.client}</h2>
                                        <h3 className={`${styles.h4}`} >{testimonial.project}</h3>
                                    </div>
                                </div>
                                <div className="w-full md:w-4/6 h-full bg-slate-900">
                                    <div className="p-4">
                                        <div className="main-control w-full flex justify-between items-center">
                                            <img src="/icons/quotes.svg" className='w-20' alt="" />
                                            <div className={`left-right-arrow flex`}>
                                                <img src="/icons/left-arrow.svg" alt="" className="w-20" onClick={leftArrowItemHandler} />
                                                <img src="/icons/right-arrow.svg" alt="" className="w-20" onClick={rightArrowItemHandler} />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <h3 className={`${styles.h3} mt-4`}>{testimonial.project}</h3>
                                            <p className="time-period">{testimonial.duration}</p>
                                            {makeStars(5, testimonial.stars)}
                                        </div>
                                        <div className="w-full mt-4">
                                            <p>{testimonial.comments}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }
                })}
            </div>
            {makeButtons()}
        </section>
    )
}

export default Testimonial;