/* eslint-disable react/jsx-no-useless-fragment */
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
    <>
      <h1 className="mt-10 text-grey-dark text-2xl font-semibold">
        Products you might also be interested in:
      </h1>
      {products.length < 5 ? (
        <div className="flex sm:justify-between md:p-0 justify-center lg:justify-start gap-7 flex-wrap mt-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex-center">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 9e3,
              reverseDirection: true,
              pauseOnMouseEnter: true,
            }}
            shortSwipes={false}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            breakpoints={swiperBreakpoints}
            spaceBetween={30}
            className="swiper similar__swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product._id} className="bg-grey">
                <ProductCard product={product} controllableSize={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
