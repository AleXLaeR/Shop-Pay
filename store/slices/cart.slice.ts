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
      state.products = [...state.products, { ...payload, quantity: 1 }];
    },
    onExisting: (
      { products },
      { payload: { itemId, action } }: PayloadAction<{ itemId: string; action: 'add' | 'remove' }>,
    ) => ({
      products: products.map((prod) =>
        prod.itemId === itemId
          ? { ...prod, quantity: prod.quantity + (action === 'add' ? 1 : -1) }
          : prod,
      ),
    }),
    removeProduct: ({ products }, { payload }: PayloadAction<string>) => ({
      products: products.filter(({ itemId }) => itemId !== payload),
    }),
    clearCart: () => ({ products: [] }),
    setSelection: ({ products }, { payload }: PayloadAction<'select' | 'unselect'>) => ({
      products: products.map((p) => ({ ...p, isSelected: payload === 'select' })),
    }),
    selectOne: ({ products }, { payload }: PayloadAction<string>) => ({
      products: products.map((p) =>
        p.itemId === payload ? { ...p, isSelected: !p.isSelected } : p,
      ),
    }),
  },
});

export const { addProduct, removeProduct, clearCart, onExisting, selectOne, setSelection } =
  actions;

export const selectProducts = createSelector(
  ({ cart }: RootState) => Object.values(cart.products),
  (products) => products.sort((a, b) => a.name.localeCompare(b.name)),
);
export const selectQuantity = createSelector(
  ({ cart }: RootState, id: string) => cart.products.find(({ itemId }) => itemId === id),
  (product) => product?.quantity ?? 0,
);
export const selectSubTotal = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) => products.reduce((acc, { quantity }) => acc + quantity, 0),
);
export const selectTotalPrice = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) =>
    products.reduce(
      (acc, { discountedPrice, quantity, isSelected }) =>
        acc + (isSelected ? discountedPrice * quantity : 0),
      0,
    ),
);
export const selectTotalShippingPrice = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) =>
    products.reduce(
      (acc, { shippingPrice, isSelected }) => acc + (isSelected ? Number(shippingPrice) : 0),
      0,
    ),
);
export const selectIsProductSelected = createSelector(
  ({ cart }: RootState, id: string) => cart.products.find(({ itemId }) => itemId === id)!,
  (product) => product.isSelected,
);
export const selectIsAllSelected = createSelector(
  ({ cart }: RootState) => cart.products,
  (products) => products.every(({ isSelected }) => isSelected),
);

export default reducer;
