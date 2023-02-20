import { createSlice } from '@reduxjs/toolkit';
import ipRegistryThunk from '@store/thunks/ipRegistry';

const initialState: IpRegistryState = {
  currency: {
    code: '',
  },
  country: {
    name: '',
    flagUri: '',
  },
};

const { reducer } = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ipRegistryThunk.fulfilled, (state, { payload }) => {
        state.country = payload.country;
        state.currency = payload.currency;
      })
      .addCase(ipRegistryThunk.rejected, (_, { error }) => {
        console.error(`Error happened on geo-data fetch: ${error}`);
      });
  },
});

export default reducer;
