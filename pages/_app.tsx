import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import WithRedux from '@hocs/WithRedux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WithRedux>
      <Component {...pageProps} />
    </WithRedux>
  );
}
