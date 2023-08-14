import React from 'react'

interface SocialInt {
    id: number;
    link: string;
    icon: string;
}

const SocialMedia = ({ social }: { social: SocialInt[] }) => {
    return (
        <>
            <h2 className='mb-4 uppercase'>Find me with</h2>
            <ul className='flex w-full gap-2'>
                {
                    social.map((s: SocialInt) => (
                        <li className='h-12 w-12 flex justify-center items-center bg-slate-900 drop-shadow-xl' key={s.id} ><a href={s.link} target='_blink'><img src={`/icons/${s.icon}`} className='h-6' /></a></li>
                    ))
                }
            </ul>
        </>
    )
}

export default SocialMedia