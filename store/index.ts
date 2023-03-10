import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { createWrapper } from 'next-redux-wrapper';

import storage from '@store/storage';
import { persistReducer, persistStore } from 'redux-persist';

import thunk from 'redux-thunk';

import cartReducer from '@store/slices/cart.slice';
import modalReducer from '@store/slices/modal.slice';
import globalReducer from '@store/slices/global.slice';
import checkoutReducer from '@store/slices/checkout.slice';

import { globalApi } from '@store/api';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    global: persistReducer(persistConfig, globalReducer),
    cart: persistReducer(persistConfig, cartReducer),
    modal: modalReducer,
    checkout: checkoutReducer,
    [globalApi.reducerPath]: globalApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, globalApi.middleware],
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);

// export default createWrapper(() => store);
