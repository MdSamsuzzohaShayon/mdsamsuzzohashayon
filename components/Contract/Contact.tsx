'use client'

import React, { useState, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Loader from '../Loader/Loader';
import SocialMedia from '../SocialMedia/SocialMedia';
import { styles } from '@/utils/styles';
import { motion } from 'framer-motion';
import { IMessageData, ISocial } from '@/types';

interface IContactProps {
    contactImg: string;
    profession: string;
    contactMessage: string;
    email: string;
    phone: string;
    social: ISocial[];
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Contact({ contactImg, profession, contactMessage, email, phone, setIsLoading, social }: IContactProps) {
    const initialMsgData = {
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
    }
    const [msgData, setMsgData] = useState<IMessageData>(initialMsgData);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const dialogModalEl = useRef<null | HTMLDialogElement>(null);

    const sendMessageHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch('https://shayon-flask-demo-app.azurewebsites.net/api/sendemail', {
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
        <section className={`section-6 my-works wrapper-con ${styles.borderLine}`} >
            <motion.h4 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="uppercase text-rose-600 mt-16">Contact</motion.h4>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className='capitalize text-4xl md:text-6xl font-bold mt-4'>Contact With me</motion.h2>
            <dialog ref={dialogModalEl} className='bg-slate-900 w-4/6 p-12 text-gray-300' onClick={dialogElementHandler} >
                <div className="close-btn rounded-full w-12 h-12 float-right bg-slate-800 flex justify-center items-center" onClick={closeModalHandler} >
                    <XMarkIcon className="h-6 w-6 text-slate-500" />
                </div>
                <h4>{successMessage}</h4>
            </dialog>
            <div className="contact-form mt-8 flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="context w-full md:w-5/12">
                    <div className="p-4">
                        <motion.img initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, type: 'spring', stiffness: 100 }} exit={{ opacity: 0 }} src={contactImg}
                            className='p-4 w-full h-60 object-cover object-top bg-slate-900' alt="Md Shayon Contact Image" />
                        <h2 className='text-xl font-medium mt-4 capitalize'>Feel Free To Message Me</h2>
                        <p >{profession}</p>
                        <p className='my-4'>{contactMessage}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                        <SocialMedia social={social} />
                    </div>
                </div>
                <form className="form w-full md:w-7/12" onSubmit={sendMessageHandler}>
                    <div className="p-4">
                        <div className="input-group w-full flex justify-between gap-2">
                            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="input-sub-group w-3/6 flex flex-col">
                                <label htmlFor="name" className='capitalize mb-2 '>Name</label>
                                <input required onChange={inputChangeHandler} type="text" name='name' id='name' className='text-lg bg-slate-900 h-10 px-2 outline-none border-0' />
                            </motion.div>
                            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="input-sub-group w-3/6 flex flex-col">
                                <label htmlFor="phone" className='capitalize mb-2'>Phone Number</label>
                                <input required onChange={inputChangeHandler} type="number" name='phone' id='phone' className='text-lg bg-slate-900 h-10 px-2 outline-none border-0 remove-arrow' />
                            </motion.div>
                        </div>
                        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="input-group w-full mt-4">
                            <label htmlFor="email" className='capitalize'>Email</label>
                            <input required onChange={inputChangeHandler} type="text" name='email' id='email' className='text-lg bg-slate-900 h-10 px-2 outline-none border-0 w-full mt-2' />
                        </motion.div>
                        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="input-group w-full mt-4">
                            <label htmlFor="subject" className='capitalize'>Subject</label>
                            <input required onChange={inputChangeHandler} type="text" name='subject' id='subject' className='text-lg bg-slate-900 h-10 px-2 outline-none border-0 w-full mt-2' />
                        </motion.div>
                        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="input-group w-full mt-4">
                            <label htmlFor="message" className='capitalize'>Message</label>
                            <textarea required onChange={inputChangeHandler} name="message" id="message" rows={4} className='text-lg bg-slate-900 p-2 outline-none border-0 w-full mt-2' ></textarea>
                        </motion.div>
                        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="input-group w-full mt-4">
                            <button type='submit' className="w-full bg-rose-600 text-slate-50 capitalize h-10">Send</button>
                        </motion.div>
                    </div>
                </form>
            </div>


        </section>
    )
}

export default Contact;