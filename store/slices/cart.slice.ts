import { createSelector, createSlice, PayloadAction, RootState } from '@reduxjs/toolkit';

type CartState = {
  products: (ProductModel & { quantity: number })[];
};

const initialState: CartState = { products: [] };

const { actions, reducer } = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, { payload }: PayloadAction<ProductModel>) => {
      const product = state.products.find(({ _id }) => _id === payload._id);
      if (!product) {
        return { products: [...state.products, { ...payload, quantity: 1 }] };
      }
      return {
        products: state.products.map((prod) =>
          prod._id === payload._id ? { ...prod, quantity: prod.quantity + 1 } : prod,
        ),
      };
    },
    removeProduct: (state, { payload }: PayloadAction<string>) => ({
      products: state.products.filter(({ _id }) => _id !== payload),
    }),
    clearCart: () => ({ products: [] }),
  },
});

export const { addProduct, removeProduct, clearCart } = actions;

export const selectProducts = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) => products,
);
export const selectQuantity = createSelector(
  ({ cart }: RootState, productId: string) => cart.products.find(({ _id }) => _id === productId),
  (product) => product?.quantity ?? 0,
);
export const selectSubTotal = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) => products.reduce((acc, { quantity }) => acc + quantity, 0),
);

export default reducer;
