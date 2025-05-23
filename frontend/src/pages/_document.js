import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
         <link rel="preload" href="/styles/globals.css" as="style" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
