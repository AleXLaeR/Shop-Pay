import { createSelector, createSlice, PayloadAction, RootState } from '@reduxjs/toolkit';

type CheckoutState = {
  activeAddress: string;
  addresses: UserAddress[];
};

const initialState: CheckoutState = { activeAddress: '', addresses: [] };

const { actions, reducer } = createSlice({
  name: 'checkoutSlice',
  initialState,
  reducers: {
    setActiveAddress: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      activeAddress: payload,
    }),
    updateAddresses: (state, { payload }: PayloadAction<UserAddress[]>) => ({
      ...state,
      addresses: payload,
    }),
    addAddress: ({ addresses, activeAddress }, { payload }: PayloadAction<UserAddress>) => ({
      activeAddress: addresses.length !== 0 ? activeAddress : payload._id,
      addresses: [...addresses, payload],
    }),
    deleteAddress: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      addresses: state.addresses.filter(({ _id }) => _id !== payload),
    }),
  },
});

export const { setActiveAddress, updateAddresses, addAddress, deleteAddress } = actions;

export const selectActiveAddress = createSelector(
  ({ checkout }: RootState) => checkout,
  ({ activeAddress, addresses }) => addresses.find(({ _id }) => _id === activeAddress),
);
export const selectAddresses = createSelector(
  ({ checkout }: RootState) => checkout,
  (checkoutState) => checkoutState.addresses,
);

export default reducer;
