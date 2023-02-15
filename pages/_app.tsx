import '@styles/globals.scss';
import type { AppProps } from 'next/app';

import WithRedux from '@hocs/WithRedux';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WithRedux>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" limit={1} />
    </WithRedux>
  );
}
