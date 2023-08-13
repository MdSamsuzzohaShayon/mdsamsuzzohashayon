import React from 'react';
import portfolio from '../data/portfolio.json';
import SocialMedia from './layout/SocialMedia';

const Hero = () => {
    return (
        <section className="section-2 features container mx-auto">
            <div className="uppercase text-rose-600">Features</div>
            <h2 className='capitalize text-4xl md:text-6xl font-bold mt-4'>What do I do?</h2>
            <div className="feature-list grid">
                <div className="feature-card">

                </div>
            </div>
        </section>
    )
}

export default Hero;