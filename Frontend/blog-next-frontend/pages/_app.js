import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Page from "../resource/layout/page";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Loading from "../resource/layout/loading";
import AccessDenied from "../resource/components/accessDenied";
import { checkAdmin } from "../resource/utils/checkAdmin";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
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

  if (auth.admin) {
    console.log("data");
    console.log(data);
    checkAdmin(data).then((res) => {
      console.log("Res");
      console.log(res);
      if (!res) {
        return (
          <Page title="Access Denied">
            <AccessDenied />
          </Page>
        );
      } else {
        return children;
      }
    });
  } else {
    return children;
  }
}

export default MyApp;
