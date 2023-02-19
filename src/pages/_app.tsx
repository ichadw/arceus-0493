import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import '../styles/globals.css';
import { DataContextProvider } from '@/context/data';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataContextProvider>
  );
}

export default MyApp;
