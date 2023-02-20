import { createAsyncThunk, type DefThunkConfig } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk<IpRegistryState, void, DefThunkConfig>(
  'data/fetchIpData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const ipData = getState().global as IpRegistryState;
      if (ipData.currency.code) {
        return ipData;
      }

      const {
        data: { currency, location },
      } = await axios.get<IpRegistryResponse>(
        `https://api.ipregistry.co/?key=${process.env.IP_REGISTRY_API_KEY}&fields=currency,location`,
      );

      return {
        currency,
        country: { name: location.country.name, flagUri: location.country.flag.emojitwo },
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
