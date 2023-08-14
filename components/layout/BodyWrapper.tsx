'use client'

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function BodyWrapper(props: { children: React.ReactNode }) {

    const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
    const overflowBackdropHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(e);

    }

    return (
        <div className='body-wrapper bg-gray-800 text-gray-300'>
            {/* {showBackdrop && (
                <div className="absolute top-0 left-0 wrapper-overflow h-screen w-screen bg-slate-500 opacity-5" onClick={overflowBackdropHandler}></div>
            )} */}
            <Navbar />
            {props.children}
            <Footer />
        </div>
    )
}

export default BodyWrapper;