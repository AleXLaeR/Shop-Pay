import Image from 'next/image';
import Link from 'next/link';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const swiperBreakPoints = {
  678: {
    width: 640,
    slidesPerView: 5,
  },
};

export default function SimilarSwiper() {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={5}
      slidesPerGroup={3}
      navigation
      modules={[Navigation]}
      breakpoints={swiperBreakPoints}
      className="swiper similar__swiper products__swiper"
    >
      {[].map((product: any) => (
        <SwiperSlide>
          <Link href={product.slug} title={product.name}>
            <Image
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={100}
              height={100}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
