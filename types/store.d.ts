declare module 'ReduxHooks' {
  import store from '@store/index';
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
}
