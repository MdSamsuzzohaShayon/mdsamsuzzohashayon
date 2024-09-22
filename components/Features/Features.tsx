'use client'

import React, { useEffect, useRef } from 'react';
import { styles } from '@/utils/styles';
import { motion } from 'framer-motion';
import { IFeature } from '@/types';


interface IFeaturesProps {
    features: IFeature[];
}

const Features = ({ features }: IFeaturesProps) => {

    return (
        <section className={`section-2 features wrapper-con ${styles.borderLine}`} >
            <motion.h4 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="uppercase text-rose-600 mt-16 relative">Features</motion.h4>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className='capitalize text-4xl md:text-6xl font-bold mt-4 relative'>What do I do?</motion.h2>
            <div className="feature-list grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-8 " >
                {features.map((f, i) => (
                    <motion.div initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="feature-card w-full bg-slate-900 p-4 bg-slate-900 shadow-lg shadow-slate-900/50" key={f.id}>
                        <motion.img whileHover={{ scale: 1.2 }}
                            onHoverStart={e => { }}
                            onHoverEnd={e => { }} src={`/icons/${f.icon}`} alt={f.title} className='w-16' />
                        <h3 className='mt-2 text-2xl font-bold'>{f.title}</h3>
                        <p className='mt-2'>{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Features;