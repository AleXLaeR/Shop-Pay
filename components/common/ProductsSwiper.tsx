import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const swiperBreakpoints = {
  450: { slidesPerView: 2 },
  630: { slidesPerView: 3 },
  920: { slidesPerView: 4 },
  1232: { slidesPerView: 5 },
  1520: { slidesPerView: 6 },
};

interface ProductsSwiperProps {
  products: CategorySliderProduct[];
}

export default function ProductsSwiper({ products }: ProductsSwiperProps) {
  return (
    <div className="mt-4">
      <div
        className="h-12 pl-4 rounded-sm bg-yellow text-white text-xl px-1.5 py-4 flex items-center font-semibold mb-1"
        style={{ background: '#5a31f4' }}
      >
        <span>Recently Added</span>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation
        modules={[Navigation]}
        className="products__swiper"
        breakpoints={swiperBreakpoints}
      >
        {products.map(({ id, image, name, price }) => (
          <SwiperSlide key={id} className="md:min-h-[26.5rem] rounded-md">
            <div className="overflow-hidden">
              <img
                src={image}
                alt={name}
                className="h-full w-full transition-[transform] duration-1000 hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="lg:min-h-[70px] flex justify-between flex-col p-0.5">
              <h1 className="text-sm text-black-light line-clamp-1 md:line-clamp-2">{name}</h1>
              <span className="text-red">USD {price}$</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
