'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { styles } from '@/utils/styles';
import { motion } from 'framer-motion';
import { IWork } from '@/types';

interface IWorkProps {
    works: IWork[];
}
function MyWork({ works }: IWorkProps) {
    const workListImgs = useRef<null | HTMLDivElement>(null);
    const dialogEl = useRef<null | HTMLDialogElement>(null);
    const [selectedWorkId, setSelectedWorkId] = useState<number>(1);
    const openDialogHandler = (e: React.SyntheticEvent, wId: number) => {
        e.preventDefault();
        setSelectedWorkId(wId);
        if (dialogEl.current) dialogEl.current.showModal();
    }
    const dialogElementHandler = (e: React.MouseEvent) => {
        // Check if user clicked outside of modal or not
        if (dialogEl.current) {
            const position = dialogEl.current.getBoundingClientRect();
            if (
                e.clientX < position.left ||
                e.clientX > position.right ||
                e.clientY < position.top ||
                e.clientY > position.bottom
            ) {
                dialogEl.current.close();
            }
        }
    }
    const closeModalHandler = (e: React.SyntheticEvent) => {
        if (dialogEl.current) dialogEl.current.close();
    }
    const renderSingleWork = () => {
        const findWork = works.find((w) => w.id === selectedWorkId);
        if (!findWork) return null;
        const techStackEl = [];
        for (let index = 0; index < findWork.techStack.length; index++) {
            techStackEl.push(<p className='bg-slate-800 px-4 py-2' key={index}>
                {findWork.techStack[index]}
            </p>);
        }
        const renderEl = (<div className="flex w-full gap-4 pt-4">
            <div className="w-5/12">
                <img src={`/img/projects/${findWork.imgSrc}`} alt={findWork.title} className='w-full h-full object-fit object-cover' loading='lazy' />
            </div>
            <div className="w-7/12">
                <h3 className='capitalize text-4xl md:text-6xl font-bold'>{findWork.title}</h3>
                <p className='mt-4'>{findWork.desc}</p>
                <h4 className="uppercase text-rose-600 mt-8">Tech Stack</h4>
                <div className="tech-stack-items flex gap-2 mt-4 flex-wrap">{techStackEl}</div>
                <div className="actions mt-8 flex gap-2">
                    <a href={findWork.vidUrl} target='_blink' className='bg-rose-600 text-gray-300 capitalize px-4 py-2'>Preview</a>
                    <a href={findWork.srcCode} target='_blink' className='bg-rose-600 text-gray-300 capitalize px-4 py-2'>Source Code</a>
                    {findWork.liveUrl && <a href={findWork.liveUrl} target='_blink' className='bg-rose-600 text-gray-300 capitalize px-4 py-2'>Test</a>}
                </div>
            </div>
        </div>);
        return renderEl;
    }
    useEffect(() => {
        const imgWrapEls = document.querySelectorAll('.img-wrap');

        if (imgWrapEls && imgWrapEls.length > 0) {
            imgWrapEls.forEach((imgWEl) => {
                const imgEl = imgWEl.querySelector('img');

                if (imgEl?.complete) {
                    imgWEl.classList.add('img-loaded');
                } else {
                    imgEl?.addEventListener('load', () => {
                        imgWEl.classList.add('img-loaded');
                    });
                }
            });
        }
    }, [workListImgs]);
    return (
        <section className={`section-3 my-works wrapper-con ${styles.borderLine}`} >
            <dialog ref={dialogEl} className='bg-slate-900 w-4/6 p-12 text-gray-300' onClick={dialogElementHandler} >
                <div className="close-btn rounded-full w-12 h-12 float-right bg-slate-800 flex justify-center items-center" onClick={closeModalHandler} >
                    <XMarkIcon className="h-6 w-6 text-slate-500" />
                </div>
                {renderSingleWork()}
            </dialog>
            <motion.h4 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="uppercase text-rose-600 mt-16">VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK</motion.h4>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className='capitalize text-4xl md:text-6xl font-bold mt-4'>My Works</motion.h2>
            <div className="work-list grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-8 " ref={workListImgs} >
                {works.map((w, i) => (
                    <motion.div initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="work-card w-full bg-slate-900 p-6 bg-slate-900 shadow-lg shadow-slate-900/50" key={w.id} onClick={(e) => openDialogHandler(e, w.id)}>
                        <div className="img-wrap w-full h-48 lg:h-52 xl:h-60" style={{ background: `url(/img/projects/${w.imgTiny})` }} >
                            {/* <img src={`https://images.pexels.com/photos/15508375/pexels-photo-15508375/free-photo-of-silhouette-of-forest-at-sunset.jpeg`} alt={w.title} className='w-full h-full object-fit object-cover' loading='lazy' /> */}
                            <img src={`/img/projects/${w.imgSrc}`} alt={w.title} className='w-full h-full object-fit object-cover' loading='lazy' />
                        </div>
                        <p className="text-rose-600 mt-2 uppercase text-xs">{w.type}</p>
                        <h3 className='mt-2 text-2xl font-bold'>{w.title}</h3>
                        {/* <p className='mt-2'>{w.desc}</p> */}
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
export default MyWork;