'use client'
import portfolio from '../../data/portfolio.json';
import {motion} from 'framer-motion';

function Footer() {
  return (
    <footer className="footer h-80 bg-slate-900 w-full mt-16">
      <div className="container mx-auto h-full flex flex-col items-center justify-center">
        <motion.img initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2}} src={portfolio.logo} alt="" 
        className='h-20 w-20 rounded-full object-contain object-top bg-gray-800 border-4 border-slate-700' />
        <motion.p initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.3}} >Copyright © 2023 Md Samsuzzoha Shayon. All Rights Reserved.</motion.p>
      </div>
    </footer>
  );
}

export default Footer;
