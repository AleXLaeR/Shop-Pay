import { GetServerSideProps } from 'next';
import axios from 'axios';

import SEO from '@common/SEO';
import { Header, Footer } from '@components/layout';

export default function Home({ data }: IpRegistryProps) {
  return (
    <>
      <SEO title="CheQuest" desc="CheQuest online-service for all needs" />
      <Header data={data} />
      <Footer country={data.country} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
