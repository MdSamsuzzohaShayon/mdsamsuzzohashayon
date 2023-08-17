'use client'

import React, { useState, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Loader from './Loader';
import SocialMedia from './layout/SocialMedia';
import portfolio from '../data/portfolio.json';
import { styles } from '@/styles';

const Testimonial = () => {
    const [testimonialList, setTestimonialList] = useState(portfolio.testimonial);
    const [selectedTestimonialId, setSelectedTestimonialId] = useState<number>(1);

    // Handlers
    const testItemChangeHandler = (e: React.SyntheticEvent, targetId: number) => {
        e.preventDefault();
        setSelectedTestimonialId(targetId);
    }
    const leftArrowItemHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("Left");
        
        setSelectedTestimonialId((prevState) => prevState === 1 ? testimonialList.length : prevState - 1);
    }
    const rightArrowItemHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("Right");
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

    const testimonialRender = () => {
        const findTest = testimonialList.find((t) => t.id === selectedTestimonialId);
        if (!findTest) return null;

        return (<div className='test-preview w-full mt-4 flex flex-col md:flex-row gap-4 justify-between items-center' >
            <div className="test-preview-img w-full md:w-2/6 h-full flex flex-col justify-center items-start bg-slate-900">
                <div className="p-4">
                    {findTest.clientImg ? <img src={findTest.clientImg} alt={findTest.client} className="w-3/6 h-32 object-fit object-cover" /> : <div className='flex h-32 items-center'><p className="w-3/6" >No Image Available</p></div>}
                    <h2 className={`${styles.h2} mt-4`}>{findTest.client}</h2>
                    <h3 className={`${styles.h4}`} >{findTest.project}</h3>
                </div>
            </div>
            <div className="w-full md:w-4/6 h-full bg-slate-900">
                <div className="p-4">
                    <div className="main-control w-full flex justify-between items-center">
                        <img src="/icons/quotes.svg" className='w-20' alt="" />
                        <div className={`left-right-arrow flex ${styles.shadowPrimary}`}>
                            <img src="/icons/left-arrow.svg" alt="" className="w-20" onClick={leftArrowItemHandler} />
                            <img src="/icons/right-arrow.svg" alt="" className="w-20" onClick={rightArrowItemHandler} />
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className={`${styles.h3} mt-4`}>{findTest.project}</h3>
                        <p className="time-period">{findTest.duration}</p>
                        {makeStars(5, findTest.stars)}
                    </div>
                    <div className="w-full mt-4">
                        <p>{findTest.comments}</p>
                    </div>
                </div>
            </div>
        </div>);
    }
    return (
        <section className={`section-6 testimonial container mx-auto px-4 md:px-0 ${styles.borderLine}`}>
            <h4 className="uppercase text-rose-600 mt-16">WHAT CLIENTS SAY</h4>
            <h2 className='capitalize text-4xl md:text-6xl font-bold mt-4'>Testimonial</h2>
            <div className="content flex">
                {testimonialRender()}
            </div>
            {makeButtons()}
        </section>
    )
}

export default Testimonial;