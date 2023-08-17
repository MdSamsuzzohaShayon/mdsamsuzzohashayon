'use client'

import React, { useState, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Loader from './Loader';
import SocialMedia from './layout/SocialMedia';
import portfolio from '../data/portfolio.json';
import { styles } from '@/styles';

interface MessageDataInt {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
}
const Contact = () => {
    const initialMsgData = {
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
    }
    const [msgData, setMsgData] = useState<MessageDataInt>(initialMsgData);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dialogModalEl = useRef<null | HTMLDialogElement>(null);

    const sendMessageHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch('https://j3bvyw3qdpnj4u5yu2kwxo36le0jeifz.lambda-url.ap-southeast-1.on.aws/api/sendemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(msgData)
            });
            if (response.status === 201) {
                setSuccessMessage("Thank You!!! Message has been sent to the admin successfully, admin will reploy to you soon!");
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

        // At the end
        if (dialogModalEl.current) dialogModalEl.current.showModal();
    }

    const inputChangeHandler = (e: React.ChangeEvent) => {
        const inputEl = e.target as HTMLInputElement | HTMLTextAreaElement;
        if (!inputEl.name || !inputEl.value) return;
        setMsgData((prevState) => {
            const newData = { ...prevState };
            // @ts-ignore
            newData[inputEl.name] = inputEl.value;
            return newData;
        });
    }

    // Close modal
    const dialogElementHandler = (e: React.MouseEvent) => {
        if (!dialogModalEl.current) return;
        const position = dialogModalEl.current.getBoundingClientRect();

        // Check if user clicked outside of modal or not
        if (
            e.clientX < position.left ||
            e.clientX > position.right ||
            e.clientY < position.top ||
            e.clientY > position.bottom
        ) {
            setSuccessMessage('');
            dialogModalEl.current.close();
        }
    }
    const closeModalHandler = (e: React.SyntheticEvent) => {
        setSuccessMessage('');
        if (dialogModalEl.current) dialogModalEl.current.close();
    }


    return (
        <section className={`section-5 my-works container mx-auto px-4 md:px-0 ${styles.borderLine}`}>
            <h4 className="uppercase text-rose-600 mt-16">Contact</h4>
            <h2 className='capitalize text-4xl md:text-6xl font-bold mt-4'>Contact With me</h2>
            <dialog ref={dialogModalEl} className='bg-slate-900 w-4/6 p-12 text-gray-300' onClick={dialogElementHandler} >
                <div className="close-btn rounded-full w-12 h-12 float-right bg-slate-800 flex justify-center items-center" onClick={closeModalHandler} >
                    <XMarkIcon className="h-6 w-6 text-slate-500" />
                </div>
                <h4>{successMessage}</h4>
            </dialog>
            {isLoading ? (
                <Loader text='Sending...' />
            ) : (<div className="contact-form mt-8 flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="context w-full md:w-5/12">
                    <div className="p-4">
                        <img src={portfolio.contactImg} className='p-4 w-full h-60 object-fit object-cover bg-slate-900' alt="" />
                        <h2 className='text-xl font-medium mt-4'>Feel Free To Message Me</h2>
                        <p >{portfolio.profession}</p>
                        <p className='my-4'>{portfolio.contactMessage}</p>
                        <p>Email: {portfolio.email}</p>
                        <p>Phone: {portfolio.phone}</p>
                        <SocialMedia social={portfolio.social} />
                    </div>
                </div>
                <form className="form w-full md:w-7/12" onSubmit={sendMessageHandler}>
                    <div className="p-4">
                        <div className="input-group w-full flex justify-between gap-2">
                            <div className="input-sub-group w-3/6 flex flex-col">
                                <label htmlFor="name" className='capitalize mb-2 '>Name</label>
                                <input required onChange={inputChangeHandler} type="text" name='name' id='name' className='text-lg bg-slate-900 h-10 px-2 outline-none border-0' />
                            </div>
                            <div className="input-sub-group w-3/6 flex flex-col">
                                <label htmlFor="phone" className='capitalize mb-2'>Phone Number</label>
                                <input required onChange={inputChangeHandler} type="number" name='phone' id='phone' className='text-lg bg-slate-900 h-10 px-2 outline-none border-0 remove-arrow' />
                            </div>
                        </div>
                        <div className="input-group w-full mt-4">
                            <label htmlFor="email" className='capitalize'>Email</label>
                            <input required onChange={inputChangeHandler} type="text" name='email' id='email' className='text-lg bg-slate-900 h-10 px-2 outline-none border-0 w-full mt-2' />
                        </div>
                        <div className="input-group w-full mt-4">
                            <label htmlFor="subject" className='capitalize'>Subject</label>
                            <input required onChange={inputChangeHandler} type="text" name='subject' id='subject' className='text-lg bg-slate-900 h-10 px-2 outline-none border-0 w-full mt-2' />
                        </div>
                        <div className="input-group w-full mt-4">
                            <label htmlFor="message" className='capitalize'>Message</label>
                            <textarea required onChange={inputChangeHandler} name="message" id="message" rows={4} className='text-lg bg-slate-900 p-2 outline-none border-0 w-full mt-2' ></textarea>
                        </div>
                        <div className="input-group w-full mt-4">
                            <button type='submit' className="w-full bg-rose-600 text-slate-50 capitalize h-10">Send</button>
                        </div>
                    </div>
                </form>
            </div>)}


        </section>
    )
}

export default Contact;