import { GetStaticProps } from 'next';
import useFetchIpData from '@hooks/useFetchIpData';

import SEO from '@common/SEO';
import { Header, Footer } from '@components/layout';

import CategoryList from '@components/pages/Home/Categories';
import HomeBody from '@components/pages/Home';

export default function Home() {
  useFetchIpData();

  return (
    <>
      <SEO title="ShopPay" desc="ShopPay online-service for all needs" />
      <Header />
      <div className="min-h-screen bg-grey">
        <div className="container">
          <HomeBody />
          <CategoryList heading="Women's" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
