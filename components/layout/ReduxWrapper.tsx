import { persistor, store } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as StoreProvider } from 'react-redux';

interface ReduxWrapperProps {
  children: JSX.Element[] | JSX.Element;
}

export default function ReduxWrapper({ children }: ReduxWrapperProps) {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        {Array.isArray(children) ? [...children] : children}
      </PersistGate>
    </StoreProvider>
  );
}
