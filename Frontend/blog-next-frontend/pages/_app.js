import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Page from "../resource/layout/page";
import Loading from "../resource/layout/loading";
import AccessDenied from "../resource/components/accessDenied";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth auth={Component.auth}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth(props) {
  const { children, auth } = props;
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data } = useSession({ required: true });

  if (status === "loading") {
    return <Loading />;
  }

  if (
    auth.admin &&
    data.user.access !== "admin" &&
    data.user.access !== "superAdmin"
  ) {
    return (
      <Page title="Access denied">
        <AccessDenied />
      </Page>
    );
  }

  return children;
}

export default MyApp;
