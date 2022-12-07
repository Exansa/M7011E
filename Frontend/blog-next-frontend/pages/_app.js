import "../styles/globals.css";
import { SessionProvider } from 'next-Auth/react'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <page>
        <Component {...pageProps} />
      </page>
    </SessionProvider>
  )
}

export default MyApp;
