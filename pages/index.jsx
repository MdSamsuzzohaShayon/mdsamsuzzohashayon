import withLayout from '../HOC/withLayout';
import shayonImg from '../public/img/shayon.jpg';
// import styles from '../styles/home.modules.scss';

function Home() {
  // console.log(shayonImg);
  return (
    <div className="body-wrapper">
      <div className="home-body flex flex-col sm:flex-row justify-between items-center bg-slate-200">
        <div className="sm:w-2/5 w-full">
          {/* <Image
            src={shayonImg}
            alt="w-full oject-fit object-center home-img"
          /> */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shayonImg.src}
            className="w-full object-cover object-center home-img"
            alt="shayon"
          />
        </div>
        <div className="sm:w-3/5 w-full">
          <div className="flex-items-center w-full h-full justify-start ">
            <h1 className="uppercase ml-4 sm:ml-8 sm:text-sm lg:text-4xl font-bold">
              Md. Samsuzzoha Shayon
            </h1>
            <h4 className="ml-4 sm:ml-8 my-4">Web developer</h4>
            <button
              type="button"
              className="border-none bg-slate-800 text-slate-200 sm:py-4 py-2 sm:text-lg text-xs sm:px-12 px-8 capitalize  ml-4 sm:ml-8"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(Home);
