'use client'

import React, { useState, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import portfolio from '../data/portfolio.json';

const Contact = () => {



    return (
        <section className="section-3 my-works container mx-auto px-4 md:px-0">
            <h4 className="uppercase text-rose-600 mt-20">Contact</h4>
            <h2 className='capitalize text-4xl md:text-6xl font-bold mt-4'>Contact With me</h2>
            <div className="contact-form mt-8 ">
                <div className="context w-5/12">Context</div>
                <form className="form">
                    <div className="input-group w-full">
                        <div className="input-sub-group w-3/6">
                            <label htmlFor="name" className='uppercase'>Name</label>
                            <input type="text" />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact;