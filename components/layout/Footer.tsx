'use client'
import portfolio from '../../data/portfolio.json';

function Footer() {
  return (
    <footer className="footer h-80 bg-slate-900 w-full mt-16">
      <div className="container mx-auto h-full flex flex-col items-center justify-center">
        <img src={portfolio.heroImg} alt="" className='h-20 w-20 rounded-full object-fit object-cover p-2 bg-gray-800' />
        <p>Copyright © 2023 Md Samsuzzoha Shayon. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
