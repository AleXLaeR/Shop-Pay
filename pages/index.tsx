import { GetServerSideProps } from 'next';
// import axios from 'axios';

import SEO from '@common/SEO';
import HomeBody from '@components/pages/Home';
import { Header, Footer } from '@components/layout';

export default function Home({ data }: IpRegistryProps) {
  return (
    <>
      <SEO title="ShopPay" desc="ShopPay online-service for all needs" />
      <Header data={data} />
      <div className="min-h-screen bg-grey">
        <div className="container">
          <HomeBody />
        </div>
      </div>
      <Footer country={data.country} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  /* const { data } = await axios.get<IpRegistryResponse>(
    `https://api.ipregistry.co/?key=${process.env.IP_REGISTRY_API_KEY}&fields=currency,location`,
  );
  const {
    location: { country },
    currency,
  } = data;
   */

  return {
    props: {
      // data: { country, currency },
      data: {
        country: {
          name: 'Ukraine',
          flag: { emojitwo: 'https://cdn.ipregistry.co/flags/emojitwo/ua.svg' },
        },
        currency: { code: 'UAH' },
      },
    } as IpRegistryProps,
  };
};
