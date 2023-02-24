import styles from '@styles/home-page.module.scss';

// import LeftSidebar from './LeftSidebar';
import Header from './Header';
import BestOffers from './BestOffers';
import Swiper from './Swiper';
import FlashDeals from './FlashDeals';
import RightSidebar from './RightSidebar';

export default function HomeBody() {
  return (
    <>
      <div className={styles.main}>
        <Header />
        {/* <LeftSidebar /> */}
        <Swiper />
        <BestOffers />
        <RightSidebar />
      </div>
      <FlashDeals />
    </>
  );
}
