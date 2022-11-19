import { motion } from 'framer-motion';
import FaqComp from '../FaqComp';

export const Question = () => {
  return (
    <motion.section className={`content flex flex-col`}>
      <div
        className={` text-dark-blue flex flex-1 flex-col pt-24 lg:pt-32 pb-8 lg:pb-16 lg:px-36 mx-16 xl:mx-96`}>
        <FaqComp header="Появился вопрос? Мы всегда готовы вам помочь!" />
      </div>

      <footer
        className={`grid grid-cols-1 lg:grid-cols-2 px-7 xl:px-48 lg:px-10 py-5 lg:py-7 
         bg-footer-color text-white text-sm lg:text-base font-bold leading-4 lg:leading-5 `}>
        <div
          className={` grid grid-flow-col grid-rows-2 gap-3 lg:gap-3 lg:grid-rows-3 mb-2 text-center lg:text-left`}>
          <a href="/">Акции</a>
          <a href="/">Каталог</a>
          <a href="/">Пункты приема</a>
          <a href="/">Новости</a>
          <a href="/">Партнерам</a>
          <a href="/">Карьера</a>
          <a href="/">FAQ</a>
          <a href="/">Политика приватности</a>
        </div>
        <div className={`flex flex-col items-left font-medium lg:mx-24 xl:mx-36`}>
          <span className={`text-center lg:text-left`}>Контакты</span>
          <div
            className={`flex justify-between lg:flex-col my-1 lg:my-4  leading-6 tracking-widest`}>
            <a href="tel:+77777777777">+7 (777)777-77-77</a>
            <a href="tel:+77212777777">+7 (7212) 77-77-77</a>
          </div>
          <div className={`flex justify-between mx-4 lg:mx-0`}>
            <a href="/">
              <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.6602 0.97288C22.0114 0.97288 22.309 1.09488 22.553 1.33888C22.797 1.58288 22.919 1.88048 22.919 2.23168V22.1961C22.919 22.5473 22.797 22.8449 22.553 23.0889C22.309 23.3329 22.0114 23.4549 21.6602 23.4549H15.9818V14.7897H18.8798L19.2902 11.3649H15.9818V9.16888C15.9818 8.64168 16.099 8.24168 16.3334 7.96888C16.5678 7.69608 16.997 7.55928 17.621 7.55848H19.4066V4.51408C18.6258 4.43568 17.7574 4.39648 16.8014 4.39648C15.4942 4.39648 14.4402 4.78208 13.6394 5.55328C12.8386 6.32448 12.4386 7.41248 12.4394 8.81728V11.3637H9.54141V14.7885H12.4394V23.4537H1.69581C1.34461 23.4537 1.04701 23.3317 0.803012 23.0877C0.559012 22.8437 0.437012 22.5461 0.437012 22.1949V2.23048C0.437012 1.87928 0.559012 1.58168 0.803012 1.33768C1.04701 1.09368 1.34461 0.97168 1.69581 0.97168H21.6602V0.97288Z"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
            </a>
            <a href="/">
              <svg
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23.9612 3.04977C23.3092 4.01137 22.5268 4.82657 21.614 5.49537C21.614 5.56097 21.622 5.66297 21.638 5.80137C21.654 5.93977 21.662 6.04177 21.662 6.10737C21.662 7.37857 21.4744 8.65017 21.0992 9.92217C20.724 11.1942 20.1536 12.4086 19.388 13.5654C18.6224 14.7222 17.7136 15.749 16.6616 16.6458C15.6096 17.5426 14.3464 18.2598 12.872 18.7974C11.3976 19.335 9.81241 19.6038 8.11641 19.6038C5.47561 19.6038 3.06321 18.8946 0.879211 17.4762C1.33601 17.509 1.71081 17.5254 2.00361 17.5254C4.20441 17.5254 6.16881 16.857 7.89681 15.5202C6.86961 15.5042 5.95281 15.1906 5.14641 14.5794C4.34001 13.9682 3.77361 13.1818 3.44721 12.2202C3.72401 12.2858 4.02561 12.3186 4.35201 12.3186C4.79201 12.3186 5.20761 12.2534 5.59881 12.123C4.50681 11.895 3.60201 11.349 2.88441 10.485C2.16681 9.62097 1.80801 8.62657 1.80801 7.50177V7.45257C2.42721 7.77897 3.13641 7.95817 3.93561 7.99017C3.29961 7.56617 2.79441 7.00777 2.42001 6.31497C2.04561 5.62217 1.85801 4.87657 1.85721 4.07817C1.85721 3.26297 2.06081 2.46417 2.46801 1.68177C3.65761 3.16497 5.09601 4.33457 6.78321 5.19057C8.47041 6.04657 10.3 6.52337 12.272 6.62097C12.1576 6.21377 12.1004 5.85497 12.1004 5.54457C12.1004 4.24057 12.5648 3.12817 13.4936 2.20737C14.4224 1.28657 15.5552 0.826172 16.892 0.826172C17.544 0.826172 18.1716 0.956572 18.7748 1.21737C19.378 1.47817 19.8916 1.84497 20.3156 2.31777C21.3916 2.10577 22.394 1.72257 23.3228 1.16817C22.9804 2.27697 22.2876 3.14897 21.2444 3.78417C22.2388 3.65377 23.1436 3.40937 23.9588 3.05097L23.9612 3.04977Z"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
            </a>
            <a href="/">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2.32051C15.1547 2.32051 15.525 2.33457 16.7719 2.39082C17.925 2.44238 18.5485 2.63457 18.9656 2.79863C19.5188 3.01426 19.9125 3.26738 20.325 3.67988C20.7375 4.09238 20.9953 4.48613 21.2063 5.03926C21.3656 5.45645 21.5625 6.07988 21.6141 7.23301C21.6703 8.47988 21.6844 8.85019 21.6844 12.0049C21.6844 15.1596 21.6703 15.5299 21.6141 16.7768C21.5625 17.9299 21.3703 18.5533 21.2063 18.9705C20.9906 19.5236 20.7375 19.9174 20.325 20.3299C19.9125 20.7424 19.5188 21.0002 18.9656 21.2111C18.5485 21.3705 17.925 21.5674 16.7719 21.6189C15.525 21.6752 15.1547 21.6893 12 21.6893C8.84532 21.6893 8.47501 21.6752 7.22814 21.6189C6.07501 21.5674 5.45157 21.3752 5.03439 21.2111C4.48126 20.9955 4.08751 20.7424 3.67501 20.3299C3.26251 19.9174 3.0047 19.5236 2.79376 18.9705C2.63439 18.5533 2.43751 17.9299 2.38595 16.7768C2.3297 15.5299 2.31564 15.1596 2.31564 12.0049C2.31564 8.85019 2.3297 8.47988 2.38595 7.23301C2.43751 6.07988 2.6297 5.45645 2.79376 5.03926C3.00939 4.48613 3.26251 4.09238 3.67501 3.67988C4.08751 3.26738 4.48126 3.00957 5.03439 2.79863C5.45157 2.63926 6.07501 2.44238 7.22814 2.39082C8.47501 2.32988 8.84532 2.32051 12 2.32051ZM12 0.192383C8.79376 0.192383 8.39064 0.206445 7.1297 0.262695C5.87345 0.318945 5.01564 0.520508 4.26564 0.811133C3.48751 1.11113 2.83126 1.51895 2.17501 2.1752C1.51876 2.83145 1.11564 3.49238 0.81095 4.26582C0.520325 5.01582 0.318762 5.87363 0.262512 7.13457C0.206262 8.39082 0.1922 8.79395 0.1922 12.0002C0.1922 15.2064 0.206262 15.6096 0.262512 16.8705C0.318762 18.1268 0.520325 18.9846 0.81095 19.7393C1.11095 20.5174 1.51876 21.1736 2.17501 21.8299C2.83126 22.4861 3.4922 22.8893 4.26564 23.1939C5.01564 23.4846 5.87345 23.6861 7.13439 23.7424C8.39532 23.7986 8.79376 23.8127 12.0047 23.8127C15.2156 23.8127 15.6141 23.7986 16.875 23.7424C18.1313 23.6861 18.9891 23.4846 19.7438 23.1939C20.5219 22.8939 21.1781 22.4861 21.8344 21.8299C22.4906 21.1736 22.8938 20.5127 23.1984 19.7393C23.4891 18.9893 23.6906 18.1314 23.7469 16.8705C23.8031 15.6096 23.8172 15.2111 23.8172 12.0002C23.8172 8.78926 23.8031 8.39082 23.7469 7.12988C23.6906 5.87363 23.4891 5.01582 23.1984 4.26113C22.8984 3.48301 22.4906 2.82676 21.8344 2.17051C21.1781 1.51426 20.5172 1.11113 19.7438 0.806445C18.9938 0.51582 18.136 0.314258 16.875 0.258008C15.6094 0.206445 15.2063 0.192383 12 0.192383Z"
                  fill="white"
                  fillOpacity="0.5"
                />
                <path
                  d="M12 5.93457C8.65314 5.93457 5.93439 8.64863 5.93439 12.0002C5.93439 15.3518 8.65314 18.0658 12 18.0658C15.3469 18.0658 18.0656 15.3471 18.0656 12.0002C18.0656 8.65332 15.3469 5.93457 12 5.93457ZM12 15.9377C9.82501 15.9377 8.06251 14.1752 8.06251 12.0002C8.06251 9.82519 9.82501 8.0627 12 8.0627C14.175 8.0627 15.9375 9.82519 15.9375 12.0002C15.9375 14.1752 14.175 15.9377 12 15.9377Z"
                  fill="white"
                  fillOpacity="0.5"
                />
                <path
                  d="M18.3048 7.11055C19.0866 7.11055 19.7204 6.47675 19.7204 5.69492C19.7204 4.91309 19.0866 4.2793 18.3048 4.2793C17.523 4.2793 16.8892 4.91309 16.8892 5.69492C16.8892 6.47675 17.523 7.11055 18.3048 7.11055Z"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </motion.section>
  );
};
