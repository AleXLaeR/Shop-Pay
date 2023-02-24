import { createSelector, createSlice, PayloadAction, RootState } from '@reduxjs/toolkit';
// import ipRegistryThunk from '@store/thunks/ipRegistry';

const initialState: IpRegistryState = {
  currency: {
    code: '',
  },
  country: {
    name: '',
    flagUri: '',
  },
};

const { reducer, actions } = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIpData: (_, { payload }: PayloadAction<IpRegistryState>) => payload,
  },
  /* extraReducers: (builder) => {
    builder
      .addCase(ipRegistryThunk.fulfilled, (state, { payload }) => {
        state.country = payload.country;
        state.currency = payload.currency;
      })
      .addCase(ipRegistryThunk.rejected, (_, { error }) => {
        console.error(`Error happened on geo-data fetch: ${error}`);
      });
  },
   */
});
export const { setIpData } = actions;

export const selectIpState = createSelector(
  ({ global }: RootState) => global,
  (globalState) => globalState,
);

export default reducer;
