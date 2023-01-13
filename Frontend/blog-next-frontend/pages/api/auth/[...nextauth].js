import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const options = {
  providers: [
    /*GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),*/

    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
    /*
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = { id: get_KV(credentials.username, "id", "users"), 
                       name: get_KV(credentials.username, "username", "users") , 
                       email: get_KV(credentials.username, "email", "users") }

        if(user){
          return user
        } else {
          return null
        }
      }
    })*/
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const res = await fetch("http://localhost:5001/user/me", {
          method: "GET",
          headers: new Headers({
            authorization: "Bearer " + account.access_token,
          }),
        });
        const result = await res.json();
        token.user = result;
        token.accessToken = account.access_token;

        if (result != "User does not exist") {
          console.log("existing user");
        } else {
          console.log("new user! adding user!");

          const access = "Bearer " + account.access_token;
          const data = {
            username: token.name,
          };

          await fetch("http://localhost:5001/user", {
            method: "POST",
            headers: new Headers({
              accept: "application/json",
              authorization: access,
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(data),
          });
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      console.log(session);

      return session;
    },
  },

  debug: false,
};

const Auth = (req, res) => NextAuth(req, res, options);
export default Auth;
