import React from 'react';
import portfolio from '../data/portfolio.json';

const Features = () => {
    return (
        <section className="section-2 features container mx-auto px-4 md:px-0">
            <h4 className="uppercase text-rose-600 mt-8">Features</h4>
            <h2 className='capitalize text-4xl md:text-6xl font-bold mt-4'>What do I do?</h2>
            <div className="feature-list grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-8 ">
                {portfolio.features.map((f) => (
                    <div className="feature-card w-full bg-slate-900 p-4 bg-slate-900 shadow-lg shadow-slate-900/50" key={f.id}>
                        <img src={`/icons/${f.icon}`} alt={f.title} className='w-16' />
                        <h3 className='mt-2 text-2xl font-bold'>{f.title}</h3>
                        <p className='mt-2'>{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features;