import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import ReduxWrapper from '@components/layout/ReduxWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxWrapper>
      <Component {...pageProps} />
    </ReduxWrapper>
  );
}
