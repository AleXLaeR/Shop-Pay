import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'ReduxHooks';

type CartState = {
  products: Product[];
};

const initialState: CartState = {
  products: [],
};

const { actions, reducer } = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export const selectProducts = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) => products,
);

export default reducer;
