import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import cartReducer from '@store/slices/cart.slice';
import { reducer, reducerPath, middleware } from '@store/api';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
    [reducerPath]: reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, middleware],
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);
