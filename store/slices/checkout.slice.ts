import { createSelector, createSlice, PayloadAction, RootState } from '@reduxjs/toolkit';

type CheckoutState = {
  activeAddress: string;
  addresses: (UserAddress & { _id: string })[];
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
    updateAddresses: (state, { payload }: PayloadAction<(UserAddress & { _id: string })[]>) => ({
      ...state,
      addresses: payload,
    }),
    addAddress: (state, { payload }: PayloadAction<UserAddress & { _id: string }>) => ({
      ...state,
      addresses: [...state.addresses, payload],
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
  (checkoutState) => checkoutState.activeAddress,
);
export const selectAddresses = createSelector(
  ({ checkout }: RootState) => checkout,
  (checkoutState) => checkoutState.addresses,
);

export default reducer;
