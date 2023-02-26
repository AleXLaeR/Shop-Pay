import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductCard from '../Products/ProductCard';

const swiperBreakpoints = {
  520: { slidesPerView: 2 },
  1020: { slidesPerView: 3 },
  1200: { slidesPerView: 4 },
  1430: { slidesPerView: 5 },
};

interface RelatedProductsProps {
  products: ProductModel[];
}

export default function RelatedProductsSwiper({ products }: RelatedProductsProps) {
  return (
    <div className="flex-center">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 9e3,
          reverseDirection: true,
          pauseOnMouseEnter: false,
        }}
        shortSwipes={false}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        breakpoints={swiperBreakpoints}
        spaceBetween={30}
        className="swiper similar__swiper"
      >
        {products
          .flatMap((i) => [i, i, i, i, i, i, i, i, i])
          .map((product) => (
            <SwiperSlide key={product.slug} className="bg-grey">
              <ProductCard product={product} controllableSize={false} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
