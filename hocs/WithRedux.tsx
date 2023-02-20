import { persistor, store } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as StoreProvider } from 'react-redux';

import type { OrArray } from 'types/general';
import BeatLoader from 'react-spinners/BeatLoader';
import BarLoader from 'react-spinners/ScaleLoader';

interface ReduxWrapperProps {
  children: OrArray<JSX.Element>;
}

const Loader = (
  <div className="min-h-screen bg-grey flex-center flex-col text-center gap-2">
    <BeatLoader size={20} />
    <span className="text-lg text-grey-dark">Please hang on a little...</span>
    <BarLoader />
  </div>
);

export default function ReduxWrapper({ children }: ReduxWrapperProps) {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={Loader} persistor={persistor}>
        {...[children]}
      </PersistGate>
    </StoreProvider>
  );
}

// export default wrapper.withRedux(ReduxWrapper);
