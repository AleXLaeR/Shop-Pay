import { AsyncThunk, AsyncThunkOptions, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { store } from '@store/index';

declare module '@reduxjs/toolkit' {
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

  type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
  };

  type DefThunkConfig = {
    state: RootState;
    rejectValue: string;
  };

  function createAsyncThunk<
    Returned,
    ThunkArg = void,
    ThunkApiConfig extends AsyncThunkConfig = DefThunkConfig,
  >(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
    options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>,
  ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
}
