import CountDown from '@common/CountDown';
import { MdFlashOn } from 'react-icons/md';
import { flashDealsArray } from '@data/home';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import FlashDealCard from './Card';

const swiperBreakpoints = {
  450: { slidesPerView: 2 },
  630: { slidesPerView: 3 },
  920: { slidesPerView: 4 },
  1232: { slidesPerView: 5 },
  1520: { slidesPerView: 6 },
};

interface FlashDealsProps {
  timer?: {
    amount: number;
    period: 'day' | 'week' | 'month';
  };
}

export default function FlashDeals({ timer = { amount: 7, period: 'day' } }: FlashDealsProps) {
  const { amount, period } = timer;
  const getCountdownDate = () => {
    const today = new Date();

    if (period === 'day') {
      return new Date(today.getFullYear(), today.getMonth(), today.getDate() + amount);
    }
    if (period === 'week') {
      return new Date(today.getFullYear(), today.getMonth() + amount, today.getDate());
    }
    return new Date(today.getFullYear() + amount, today.getMonth(), today.getDate());
  };

  return (
    <div className="my-8 bg-white">
      <div className="p-1.5 flex-between flex-col gap-2 sm:flex-row text-sm sm:text-lg md:text-xl text-white font-[900] text-xl bg-yellow rounded-sm mb-1.5">
        <h1 className="uppercase text-[1.5rem] flex gap-2">
          flash sale
          <MdFlashOn className="scale-125 md:scale-150" />
        </h1>
        <CountDown date={getCountdownDate()} />
      </div>
      <Swiper
        navigation
        slidesPerView={1}
        spaceBetween={12}
        modules={[Navigation]}
        className="flashDeals__swiper"
        breakpoints={swiperBreakpoints}
      >
        <div className="flex flex-wrap justify-stretch">
          {flashDealsArray.map((product) => (
            <SwiperSlide key={product.id}>
              <FlashDealCard product={product} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
