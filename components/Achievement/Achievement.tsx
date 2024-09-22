'use client'

import React, { useEffect, useRef, useState } from 'react';
import { styles } from '@/utils/styles';
import { motion } from 'framer-motion';
import { IAchievement } from '@/types';


interface IAcheivementsProps {
    acheivements: IAchievement[];
}

// https://www.pinterest.com/pin/59461657571926852/
function Acheivements({ acheivements }: IAcheivementsProps) {

    const [years, setYears] = useState<number>(0);

    useEffect(() => {
        const startYear = 2019;
        const currentYear = new Date().getFullYear();
        const yearsOfExperience = currentYear - startYear;
        setYears(yearsOfExperience);
    }, []);

    return (
        <section className={`section-2 Acheivements wrapper-con ${styles.borderLine}`} >
            {/* style={{height: "27rem"}} */}
            <div className={`achievements-area py-4 static md:relative ${styles.bg_2}`} >
                <div className="w-4/6 static md:absolute start-0 top-0 z-0 h-full bg-slate-900 "></div>
                <div className="w-4/6 static md:absolute start-0 top-0 px-4 text-center md:mt-28">
                    {/* <motion.h4 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="uppercase text-rose-600 mt-16">Acheivements</motion.h4> */}
                    <h1 className='uppercase font-black text-4xl md:text-8xl'>{years}</h1>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className='capitalize  '> Years of experience</motion.h2>
                </div>
                <div className="achievement-list static md:absolute end-0 top-10 px-4 w-full md:w-3/6">
                    <div className="grid grid-cols-2 gap-4 w-full mt-8">
                        {acheivements.map((am) => (
                            <div key={am.id} className="achievement-card w-full bg-slate-600 hover:bg-rose-600 p-4 shadow-lg shadow-slate-900/50 text-center" >
                                <h3 className="text-4xl">{am.num}+</h3>
                                <h3 className='uppercase font-bold'>{am.achieve}</h3>
                                <p>{am.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* <div className="feature-list grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-8 " >
                {acheivements.map((f, i) => (
                    <motion.div initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="feature-card w-full bg-slate-900 p-4 bg-slate-900 shadow-lg shadow-slate-900/50" key={f.id}>
                        <motion.img whileHover={{ scale: 1.2 }}
                            onHoverStart={e => { }}
                            onHoverEnd={e => { }} src={`/icons/${f.icon}`} alt={f.title} className='w-16' />
                        <h3 className='mt-2 text-2xl font-bold'>{f.title}</h3>
                        <p className='mt-2'>{f.desc}</p>
                    </motion.div>
                ))} 
            </div> */}
        </section>
    )
}

export default Acheivements;