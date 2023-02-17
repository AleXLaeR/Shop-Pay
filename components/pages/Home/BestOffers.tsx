import Link from 'next/link';
import styles from '@styles/home-page.module.scss';

import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { offersArray } from '@data/home';

const swiperBreakpoints = {
  500: { slidesPerView: 2 },
  700: { slidesPerView: 3 },
  1660: { slidesPerView: 4 },
};

export default function BestOffers() {
  return (
    <div className={styles.offers}>
      <div className="hidden lg:block max-w-[200px] absolute top-3 left-6 font-semibold p-4 text-black-lighter text-center">
        <p>
          use code <b>“SHOP23”</b> for 30% off all products!
        </p>
        <Link
          href="/products"
          className="mt-8 flex-center bg-blue h-10 rounded-lg font-semibold text-white border-[1px] border-white transition-[transform] duration-200 ease-in-out hover:scale-105"
        >
          Shop now
        </Link>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        navigation
        autoplay={{
          delay: 6e3,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Navigation]}
        className="offers_swiper"
        breakpoints={swiperBreakpoints}
      >
        {offersArray.map(({ id, image, price, discount }, idx) => (
          <SwiperSlide key={id}>
            <Link href="/" className="w-full h-full">
              <img src={image} alt={`Offer ${idx + 1}`} />
            </Link>
            <span className="absolute text-base text-white bottom-1.5 w-[5.5rem] h-6 rounded-3xl font-semibold bg-yellow">
              {price}$
            </span>
            <span className="absolute text-base text-white top-1 sm:-top-2 left-0 bg-red w-10 h-10 rounded-full shadow-md grid place-items-center italic font-semibold">
              -{discount}%
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
