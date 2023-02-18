import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import WithRedux from '@hocs/WithRedux';

import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WithRedux>
      <NextNProgress height={6} />
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" limit={2} />
    </WithRedux>
  );
}
