import { persistor, store } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as StoreProvider } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';

interface ReduxWrapperProps {
  children: JSX.Element[] | JSX.Element;
}

export default function ReduxWrapper({ children }: ReduxWrapperProps) {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={<PulseLoader />} persistor={persistor}>
        {Array.isArray(children) ? [...children] : children}
      </PersistGate>
    </StoreProvider>
  );
}
