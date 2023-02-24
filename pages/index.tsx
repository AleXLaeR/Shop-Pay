import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectIpState, setIpData } from '@store/slices/global.slice';
import { GetStaticProps } from 'next';
import axios from 'axios';

import SEO from '@common/SEO';
import { Header, Footer } from '@components/layout';

import CategoryList from '@components/pages/Home/Categories';
import HomeBody from '@components/pages/Home';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const ipState = useAppSelector(selectIpState);

  useEffect(() => {
    if (!ipState.country.name) {
      axios
        .get<IpRegistryResponse>(
          `https://api.ipregistry.co/?key=${process.env.ip_registry_key!}&fields=currency,location`,
        )
        .then(({ data: { location, currency }, statusText }) => {
          console.log(statusText);
          const { country } = location;
          dispatch(
            setIpData({
              country: {
                name: country.name,
                flagUri: country.flag.emojitwo,
              },
              currency,
            }),
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    },
  };
};
