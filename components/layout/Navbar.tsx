'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import SocialMedia from './SocialMedia';




import portfolio from '../../data/portfolio.json';

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const overflowBackdropHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);

  }

  return (
    <nav className="navbar container mx-auto w-full flex h-20 items-center justify-between ">
      <img src={portfolio.logo} className='h-16 w-16 object-fit object-cover rounded-full bg-slate-900 border-4 border-slate-800 ml-2 md:ml-0 ' />

      {/* Desktop menu  */}
      <ul className="hidden md:flex items-center h-full bg-slate-700 md:bg-transparent">
        {portfolio.navMenus.map((page) => (
          <li
            className="list-none ml-8 hover:text-slate-200 hover:text-slate-100 transition duration-300 ease-in flex items-center justify-center"
            key={page.id}
          >
            <Link href={page.link}>{page.text}</Link>
            {/* {page.icon && <SelectIcons selectedItem={page.icon} />} */}
          </li>
        ))}
      </ul>

      <Bars3Icon className="block md:hidden h-6 w-6 text-slate-500 mr-2 md:mr-0" onClick={() => setToggleMenu(true)} />

      {/* Mobile menu  */}
      {toggleMenu && (
        <div className="absolute md:static top-0 left-0 w-5/6 md:w-fit block md:hidden items-center h-screen md:h-full flex-col md:flex-row bg-slate-950 md:bg-transparent z-20">
          <div className="icon-menus px-4 flex justify-between items-center mt-8 pb-8 border-b border-slate-900">
            <img src={portfolio.logo} className='h-16 w-16 object-fit object-cover rounded-full bg-slate-900 border-4 border-slate-800' />
            <XMarkIcon className="block md:hidden h-6 w-6 text-slate-500" onClick={() => setToggleMenu(false)} />
          </div>
          <ul className="w-full flex items-start flex-col px-4 mt-8 gap-4">
            {portfolio.navMenus.map((page) => (
              <li
                className="list-none hover:text-slate-200 hover:text-slate-100 transition duration-300 ease-in flex items-center justify-center"
                key={page.id}
              >
                <Link href={page.link}>{page.text}</Link>
                {/* {page.icon && <SelectIcons selectedItem={page.icon} />} */}
              </li>
            ))}
          </ul>
          <div className="social mt-8 border-t border-slate-900 pt-8 px-4">
            <SocialMedia social={portfolio.social} />
          </div>
        </div>
      )}

      {toggleMenu && (
        <div className="absolute top-0 left-0 wrapper-overflow h-screen w-screen bg-slate-950 opacity-50" onClick={() => setToggleMenu(false)}></div>
      )}
    </nav>
  );
}

export default Navbar;
