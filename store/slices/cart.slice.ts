import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from 'types/product';

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

export default reducer;
