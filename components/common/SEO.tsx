import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title: string;
  desc: string;
  meta?: [string, string][];
}

export default function SEO({ title, desc, meta }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={desc} />
      <link rel="icon" href="/favicon.ico" />
      {meta?.map(([name, content]) => (
        <meta name={name} content={content} />
      ))}
    </Head>
  );
}
