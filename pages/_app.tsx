import '@styles/globals.scss';
import { useState } from 'react';

import type { AppProps } from 'next/app';
import Router from 'next/router';

import WithRedux from '@hocs/WithRedux';
import { SessionProvider } from 'next-auth/react';

import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import { CombinedLoader } from '@common/loaders';

export default function App({ Component, pageProps }: AppProps) {
  const [isPageLoading, setPageLoading] = useState(false);

  Router.events.on('routeChangeStart', () => setPageLoading(true));
  Router.events.on('routeChangeComplete', () => setPageLoading(false));
  Router.events.on('routeChangeError', () => setPageLoading(false));

  return (
    <SessionProvider>
      <WithRedux>
        <NextNProgress height={6} />
        {isPageLoading ? <CombinedLoader /> : <Component {...pageProps} />}
        <ToastContainer autoClose={5e3} pauseOnHover={false} position="bottom-right" limit={1} />
      </WithRedux>
    </SessionProvider>
  );
}
