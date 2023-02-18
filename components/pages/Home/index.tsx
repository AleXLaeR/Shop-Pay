import styles from '@styles/home-page.module.scss';

import Menu from './Menu';
import Header from './Header';
import BestOffers from './BestOffers';
import Swiper from './Swiper';
import FlashDeals from './FlashDeals';
import User from './User';

export default function HomeBody() {
  return (
    <>
      <div className={styles.main}>
        <Header />
        <Menu />
        <Swiper />
        <BestOffers />
        <User />
      </div>
      <FlashDeals />
    </>
  );
}
