import { GetStaticProps } from 'next';
import useFetchIpData from '@hooks/useFetchIpData';

import SEO from '@common/SEO';
import { Header, Footer } from '@components/layout';

import ProductCard from '@components/pages/Products/ProductCard';
import CategoryList from '@components/pages/Home/Categories';
import HomeBody from '@components/pages/Home';

import db from '@services/db.service';
import { Product } from '@models/index';

interface HomePageProps {
  products: ProductModel[];
}

export default function Home({ products }: HomePageProps) {
  useFetchIpData();

  return (
    <>
      <SEO title="ShopPay" desc="ShopPay online-service for all needs" />
      <Header />
      <div className="min-h-screen bg-grey">
        <div className="container">
          <HomeBody />
          <CategoryList heading="Women's" />
          <div className="flex-between gap-4 flex-wrap mt-6">
            {products
              .flatMap((p) => [p, p, p])
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await db.connectToDb();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  await db.disconnectFromDb();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
