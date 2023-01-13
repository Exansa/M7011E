import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
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

  const [admin, setAdmin] = useState(false);

  // This is called whenever the session changes or a page with auth is loaded
  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await fetch("http://localhost:5001/admins/me", {
        method: "GET",
        headers: {
          authorization: "Bearer " + data.accessToken,
        },
      });
      if (res.status === 200) {
        setAdmin(true);
      }
    };

    if (status !== "loading" && auth.admin) {
      fetchAdmin();
    }
  }, [auth.admin, data, status]);

  // We want to avoid flashing sensitive content on the screen
  if (!data && status === "loading") {
    return <Loading />;
  }

  if (auth.admin && !admin) {
    return (
      <Page title="Access denied">
        <AccessDenied />
      </Page>
    );
  }

  return children;
}

export default MyApp;
