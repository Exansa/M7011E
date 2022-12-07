import "../styles/globals.css";
import { SessionProvider } from 'next-Auth/react'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp;
