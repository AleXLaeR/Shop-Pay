import { persistor, store } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as StoreProvider } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';

interface WithReduxProps {
  children: OrArray<JSX.Element>;
}

export default function WithRedux({ children }: WithReduxProps) {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={<PulseLoader />} persistor={persistor}>
        {...[children]}
      </PersistGate>
    </StoreProvider>
  );
}
