import { persistor, store } from '@store/index';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// import { CombinedLoader } from '@common/loaders';
import type { OrArray } from 'types/general';

interface ReduxWrapperProps {
  children: OrArray<JSX.Element>;
}

export default function ReduxWrapper({ children }: ReduxWrapperProps) {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {...[children]}
      </PersistGate>
    </StoreProvider>
  );
}

// export default wrapper.withRedux(ReduxWrapper);
