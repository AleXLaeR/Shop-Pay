import { useRef, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay } from 'swiper';

interface ProductSwiperProps {
  items?: ProductImage[];
}

const autoPlayOptions = {
  delay: 800,
  stopOnLastSlide: false,
};

export default function ImageSwiper({ items }: ProductSwiperProps) {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }, []);

  const onNextSwipeProps = useMemo(
    () => ({
      allowSlidePrev: swiperRef.current?.swiper.activeIndex !== 0,
      allowSlideNext: swiperRef.current?.swiper.activeIndex !== (items?.length ?? 1) - 1,
    }),
    [items?.length],
  );

  const onMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
      swiperRef.current.swiper.slideTo(0);
    }
  };

  return (
    <div
      className="relative cursor-pointer bg-white"
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => swiperRef.current?.swiper.autoplay.start()}
    >
      <Swiper
        ref={swiperRef}
        centeredSlides
        speed={800}
        autoplay={autoPlayOptions}
        modules={[Autoplay]}
        {...onNextSwipeProps}
      >
        {items?.map(({ uri, publicUri }, idx) => (
          <SwiperSlide key={idx}>
            <img className="h-[24rem] block rounded-md" src={uri} alt={publicUri} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
