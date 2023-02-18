import { persistor, store } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as StoreProvider } from 'react-redux';

import BeatLoader from 'react-spinners/BeatLoader';
import BarLoader from 'react-spinners/ScaleLoader';
import type { OrArray } from 'types/general';

interface WithReduxProps {
  children: OrArray<JSX.Element>;
}

const Loader = (
  <div className="min-h-screen bg-grey flex-center flex-col text-center gap-2">
    <BeatLoader size={20} />
    <span className="text-lg text-grey-dark">Please hang on a little...</span>
    <BarLoader />
  </div>
);

export default function WithRedux({ children }: WithReduxProps) {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={Loader} persistor={persistor}>
        {...[children]}
      </PersistGate>
    </StoreProvider>
  );
}
