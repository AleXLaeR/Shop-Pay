import { createSelector, createSlice, PayloadAction, RootState } from '@reduxjs/toolkit';

type CartState = {
  products: CartProduct[];
};

const initialState: CartState = { products: [] };

const { actions, reducer } = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, { payload }: PayloadAction<CartProduct>) => {
      const product = state.products.find(({ itemId }) => itemId === payload.itemId);
      if (!product) {
        return { products: [...state.products, { ...payload, quantity: 1 }] };
      }
      return {
        products: state.products.map((prod) =>
          prod.itemId === payload.itemId
            ? { ...prod, quantity: prod.quantity + payload.quantity }
            : prod,
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
export const selectTotalPrice = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) => products.reduce((acc, { discountedPrice }) => acc + discountedPrice, 0),
);

export default reducer;
