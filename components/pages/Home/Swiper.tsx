import Image from 'next/image';
import styles from '@styles/home-page.module.scss';
import SlideImg from '@assets/images/home/homeSlide_1.jpg';

import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HomeSwiper() {
  return (
    <div className={styles.swiper}>
      <Swiper
        loop
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 10e3,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="main__swiper"
      >
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <SwiperSlide key={idx} className="rounded-md overflow-hidden">
              <Image src={SlideImg} alt={`Image ${idx + 1}`} fill />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
