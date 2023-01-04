import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Page from "../resource/layout/page";
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
