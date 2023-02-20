import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { createWrapper } from 'next-redux-wrapper';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import cartReducer from '@store/slices/cart.slice';
import globalReducer from '@store/slices/global.slice';

import { newsletterApi } from '@store/api';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: persistReducer(persistConfig, cartReducer),
    [newsletterApi.reducerPath]: newsletterApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, newsletterApi.middleware],
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);

// export default createWrapper(() => store);
