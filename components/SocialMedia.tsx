import React from 'react';
import { styles } from '@/styles';
import { motion } from 'framer-motion';

interface SocialInt {
    id: number;
    link: string;
    icon: string;
}

const SocialMedia = ({ social }: { social: SocialInt[] }) => {
    return (
        <>
            <motion.h2 className='mb-4 uppercase font-bold relative' initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.3}} >Find me with</motion.h2>
            <ul className='flex w-full gap-2'>
                {
                    social.map((s: SocialInt) => (
                        <motion.li initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, type: 'spring', stiffness: 100 }} className={`h-12 w-12 flex justify-center items-center bg-slate-900 ${styles.shadow}`} key={s.id} ><a href={s.link} target='_blink'><img src={`/icons/${s.icon}`} className='h-6' /></a></motion.li>
                    ))
                }
            </ul>
        </>
    )
}

export default SocialMedia;