'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import SocialMedia from '../SocialMedia';
import { motion } from 'framer-motion';

const DELAY: number = 0.2;


import portfolio from '../../data/portfolio.json';

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  // Animation properties
  const [mobileMenuX, setMobileMenuX] = useState<number>(0);
  const [navItemX, setNavItemX] = useState<number>(0);


  const scrollViewHandler = (e: React.SyntheticEvent, sectionId: number) => {
    e.preventDefault();
    const targetElement: HTMLElement | null = document.querySelector(`.section-${sectionId}`);
    if (!targetElement) return;
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }

  const elOfMobileMenu = {
    hidden: { opacity: 0, x: -120 },
    show: {
      opacity: 1, x: 0,
      // transition: {
      //   delay: 0.2,
      // }
    },
  };

  const closeMenuHandler = (e: React.SyntheticEvent) => {
    setToggleMenu(false);
    setMobileMenuX(-100);
  }
  const openMenuHandler = (e: React.SyntheticEvent) => {
    setToggleMenu(true);
    setMobileMenuX(0);
  }

  // initial={{ x: -100 }}
  // animate={{ x: 0 }}
  // transition={{ ease: "easeOut", delay: 0.3 }}

  useEffect(() => {
    return () => {
      console.log("unmount");

    }
  }, []);

  return (
    <nav className="navbar container mx-auto w-full flex h-20 items-center justify-between " >

      <motion.img initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, type: 'spring', stiffness: 100 }} src={portfolio.logo} className='h-16 w-16 object-fit object-cover rounded-full bg-slate-900 border-4 border-slate-800 ml-2 md:ml-0 ' />

      {/* Desktop menu  */}
      <ul className="hidden md:flex items-center h-full bg-slate-700 md:bg-transparent">
        {portfolio.navMenus.map((page, index) => (
          <motion.li
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: parseFloat(`0.${index}`) }}
            className="list-none ml-8 hover:text-slate-200 hover:text-slate-100 transition duration-300 ease-in flex items-center justify-center justify-between flex-col"
            key={page.id}
            onClick={(e) => scrollViewHandler(e, page.id)}
            onMouseEnter={(e) => setNavItemX(0)}
            onMouseLeave={(e) => setNavItemX(-15)}
          >
            <Link href="#" onClick={(e)=> e.preventDefault()}>{page.text}</Link>
            {/* {page.icon && <SelectIcons selectedItem={page.icon} />} */}
            <motion.div
              whileHover={{ width: "100%", borderColor: "#007BFF" }}
              className='border-b border-rose-600 h-2'
              style={{
                width: "50px",
                height: "2px",
                border: "2px solid transparent",
                transition: "width 0.3s ease, border-color 0.3s ease"
              }}
            ></motion.div>
          </motion.li>
        ))}
      </ul>

      <Bars3Icon className="block md:hidden h-6 w-6 text-slate-500 mr-2 md:mr-0" onClick={openMenuHandler} />

      {/* Mobile menu  */}
      {toggleMenu && (
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: mobileMenuX }}
          className="absolute md:static top-0 left-0 w-5/6 md:w-fit block md:hidden items-center h-screen md:h-full flex-col md:flex-row bg-slate-950 md:bg-transparent z-20">
          <div className="icon-menus px-4 flex justify-between items-center mt-8 pb-8 border-b border-slate-900">
            <motion.img initial={{ opacity: 0, x: -120 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: DELAY }} src={portfolio.logo} className='h-16 w-16 object-fit object-cover rounded-full bg-slate-900 border-4 border-slate-800' />
            <XMarkIcon className="block md:hidden h-6 w-6 text-slate-500" onClick={closeMenuHandler} />
          </div>
          <ul className="w-full flex items-start flex-col px-4 mt-8 gap-4">
            {portfolio.navMenus.map((page) => (
              <motion.li
                variants={elOfMobileMenu}
                initial='hidden'
                animate='show'
                className="list-none hover:text-slate-200 hover:text-slate-100 transition duration-300 ease-in flex items-center justify-center"
                key={page.id}
              >
                <Link href={page.link}>{page.text}</Link>
                {/* {page.icon && <SelectIcons selectedItem={page.icon} />} */}
              </motion.li>
            ))}
          </ul>
          <motion.div initial={{ opacity: 0, x: -120 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: DELAY }} className="social mt-8 border-t border-slate-900 pt-8 px-4">
            <SocialMedia social={portfolio.social} />
          </motion.div>
        </motion.div>
      )}

      {toggleMenu && (
        <div className="absolute top-0 left-0 wrapper-overflow h-screen w-screen bg-slate-950 opacity-50" onClick={() => setToggleMenu(false)}></div>
      )}
    </nav>
  );
}

export default Navbar;
