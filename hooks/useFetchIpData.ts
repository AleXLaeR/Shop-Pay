import { useEffect } from 'react';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectIpState, setIpData } from '@store/slices/global.slice';

export default function useFetchIpData() {
  const dispatch = useAppDispatch();
  const ipState = useAppSelector(selectIpState);

  useEffect(() => {
    if (!ipState.country.name) {
      axios
        .get<IpRegistryResponse>(
          `https://api.ipregistry.co/?key=${process.env.ip_registry_key}&fields=currency,location`,
        )
        .then(({ data: { location, currency } }) => {
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
        })
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
