import Link from 'next/link';
import { useState } from 'react';
import SelectIcons from '../components/SelectIcons';

const initialAllPages = [
  {
    id: 1,
    text: 'Home',
    url: '/',
    icon: 'AiFillHome',
  },
  {
    id: 2,
    text: 'About',
    url: '/about',
    icon: 'FcAbout',
  },
  {
    id: 3,
    text: 'Contact',
    url: '/contact',
    icon: 'AiFillContacts',
  },
  {
    id: 4,
    text: 'Projects',
    url: '/projects',
    icon: 'AiFillProject',
  },
  {
    id: 5,
    text: 'Services',
    url: '/services',
    icon: 'GrServices',
  },
];

function Navbar() {
  // eslint-disable-next-line no-unused-vars
  const [allPages, setAllPages] = useState(initialAllPages);
  return (
    <nav className="navbar w-full flex flex-wrap h-20 items-center">
      {/* <h2 className="bg-red-300">Hi nnavbar</h2> */}
      <div className="brand flex-1 w-6/12">
        <h2 className="uppercase">Shayon</h2>
      </div>
      <div className="item-list flex-1 w-6/12">
        <ul className="flex w-full items-center h-full justify-end flex-wrap">
          {allPages.map((page) => (
            <li
              className="list-none px-8 py-2 hover:text-slate-200 hover:bg-slate-800 transition duration-300 ease-in flex items-center justify-center"
              key={page.id}
            >
              <Link href={page.url}>{page.text}</Link>
              {page.icon && <SelectIcons selectedItem={page.icon} />}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
