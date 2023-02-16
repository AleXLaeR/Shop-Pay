import 'swiper/css';

import Menu from './Menu';
import Header from './Header';
import BestOffers from './BestOffers';
import Swiper from './Swiper';
import FlashDeals from './FlashDeals';

export default function HomeBody() {
  return (
    <div className="main">
      <Header />
      <Menu />
      <Swiper />
      <BestOffers />
      <FlashDeals />
    </div>
  );
}
