import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import SEO from '@common/SEO';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <SEO title="Page" desc="Some Page" />
      <p className="text-white">Some text</p>
    </div>
  );
}
