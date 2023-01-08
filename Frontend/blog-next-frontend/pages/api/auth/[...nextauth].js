import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Auth0Provider from "next-auth/providers/auth0";
import { get_KV } from "../../../data/mock_request/db_handler";

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

    async jwt(token,session, user, account, profile, isNewUser){
      
      if (token.account){
        const res = await fetch("http://localhost:5001/user/me", {
          method: "GET",
          headers: new Headers({
            authorization: "Bearer " + token.account.access_token,
          }),
        });
        const result = await res.json();

        if (result) {
          console.log("existing user");
          //session.accessToken = result;
        } else {
          console.log("new user");
          //redirect to creation page with result
        }
        return token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.token.account){
        //console.log('token accoutn', token.token.account)
        session.accessToken = token.token.account.access_token
        const res = await fetch("http://localhost:5001/user/me", {
          method: 'GET',
          headers: new Headers({
            authorization: "Bearer " + session.accessToken,
          }),
        });
        const result = await res.json();

        if (result) {
          session.user = result;
        }*/
        console.log(session);

        return session;
      }
      //return session
    },

    /*async session(session, token){
      console.log(token);
    }*/
  },

  debug: false,
};

export default (req, res) => NextAuth(req, res, options);
