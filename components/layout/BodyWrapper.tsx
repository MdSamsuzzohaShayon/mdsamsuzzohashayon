'use client'

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, useScroll } from 'framer-motion';
import { useStaticData } from '@/context/StaticDataProvider';

function BodyWrapper(props: { children: React.ReactNode }) {
    const {logo, navMenus, social} = useStaticData();
    const { scrollYProgress } = useScroll();

    const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
    const overflowBackdropHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(e);

    }

    // .progress-bar {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    //     height: 10px;
    //     background: var(--red);
    //     transform-origin: 0%;
    //   }

    
      

    return (
        <motion.div className='body-wrapper bg-gray-800 text-gray-300' >
            <motion.div  style={{ scaleX: scrollYProgress, transformOrigin: '0%' }} className='fixed z-50 top-0 left-0 right-0 h-2 bg-rose-600'></motion.div>
            {/* {showBackdrop && (
                <div className="absolute top-0 left-0 wrapper-overflow h-screen w-screen bg-slate-500 opacity-5" onClick={overflowBackdropHandler}></div>
            )} */}
            <Navbar logo={logo} navMenus={navMenus} social={social} />
            {props.children}
            <Footer logo={logo} />
        </motion.div>
    )
}

export default BodyWrapper;