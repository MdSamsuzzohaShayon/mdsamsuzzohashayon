'use client'

import React, { useState, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

interface MessageDataInt {
    name: string;
    phone: null | number;
    email: string;
    subject: string;
    message: string;
}
const Contact = () => {
    const initialMsgData = {
        name: '',
        phone: null,
        email: '',
        subject: '',
        message: '',
    }
    const [msgData, setMsgData] = useState<MessageDataInt>(initialMsgData);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const dialogModalEl = useRef<null | HTMLDialogElement>(null);

    const sendMessageHandler = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(msgData);
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
            dialogModalEl.current.close();
        }
    }
    const closeModalHandler = (e: React.SyntheticEvent) => {
        if (dialogModalEl.current) dialogModalEl.current.close();
    }


    return (
        <section className="section-3 my-works container mx-auto px-4 md:px-0">
            <dialog ref={dialogModalEl} className='bg-slate-900 w-4/6 p-12 text-gray-300' onClick={dialogElementHandler} >
                <div className="close-btn rounded-full w-12 h-12 float-right bg-slate-800 flex justify-center items-center" onClick={closeModalHandler} >
                    <XMarkIcon className="h-6 w-6 text-slate-500" />
                </div>
                <h4>{successMessage}</h4>
            </dialog>
            <h4 className="uppercase text-rose-600 mt-20">Contact</h4>
            <h2 className='capitalize text-4xl md:text-6xl font-bold mt-4'>Contact With me</h2>
            <div className="contact-form mt-8 flex justify-between items-start">
                <div className="context w-5/12">Context Info</div>
                <form className="form w-7/12" onSubmit={sendMessageHandler}>
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
                        <input required onChange={inputChangeHandler} type="text" name='text' id='subject' className='text-lg bg-slate-900 h-10 px-2 outline-none border-0 w-full mt-2' />
                    </div>
                    <div className="input-group w-full mt-4">
                        <label htmlFor="message" className='capitalize'>Message</label>
                        <textarea required onChange={inputChangeHandler} name="message" id="message" rows={4} className='text-lg bg-slate-900 p-2 outline-none border-0 w-full mt-2' ></textarea>
                    </div>
                    <div className="input-group w-full mt-4">
                        <button type='submit' className="w-full bg-rose-600 text-slate-50 capitalize h-10">Send</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact;