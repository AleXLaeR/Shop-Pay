import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import { Header, ReduxWrapper } from '@components/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxWrapper>
      <Header />
      <Component {...pageProps} />
    </ReduxWrapper>
  );
}
