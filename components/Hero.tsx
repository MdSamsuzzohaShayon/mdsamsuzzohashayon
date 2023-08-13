import React from 'react';
import portfolio from '../data/portfolio.json';
import SocialMedia from './layout/SocialMedia';
const Hero = () => {
    return (
        <section className="section-1 hero container mx-auto flex justify-between flex-col-reverse md:flex-row min-h-fit md:min-h-screen items-center px-4 md:px-0">
            <div className="w-full md:w-7/12 flex flex-col items-start justify-between gap-12 md:gap-32 h-full">
                <div className="headings w-full">
                    <p className='mt-8'>WELCOME TO MY WORLD</p>
                    <h1 className='capitalize text-4xl md:text-6xl font-bold mt-4'>I'm <span className='text-slate-300'>Md Samsuzzoha Shayon</span></h1>
                    <h1 className='capitalize text-4xl md:text-6xl font-bold mt-4 text-rose-600'>A web developer</h1>
                    <p className='mt-4'>I use animation as a third dimension by which to simplify experiences and kuiding thro each and every interaction. I’m not adding motion just to spruce things up, but doing it in ways that.</p>
                </div>
                <div className="social-skills flex flex-col md:flex-row gap-4 justify-between w-ful w-full">
                    <div className="social">
                        <SocialMedia social={portfolio.social} />
                    </div>
                    <div className="skills">
                        <h2 className='mb-4 uppercase'>Best Skill on</h2>
                        <ul className='flex w-full gap-2'>
                            {portfolio.bestSkills.map((skill) => (
                                <li key={skill.id} className='h-12 w-12 flex justify-center items-center bg-slate-900'><img src={`/icons/${skill.icon}`} className='h-6' alt="" /></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-5/12 flex justify-end">
                <div className="img-bg right-img-bg flex justify-center relative">
                    <img src={portfolio.heroImg} alt="shayon hero image" className='absolute h-full w-full md:w-5/6 object-top md:object-fit object-cover top-0 left-0 md:left-7 z-10' />
                    <div className="img-ground w-full h-5/6 absolute bottom-0 z-0 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 shadow-lg shadow-slate-900/50"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero;