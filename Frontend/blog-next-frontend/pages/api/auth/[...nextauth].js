import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import Auth0Provider from "next-auth/providers/auth0";
import { get_KV } from '../../../data/mock_request/db_handler';

const options = {
  providers: [
    /*GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),*/

    Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        issuer: process.env.AUTH0_ISSUER_BASE_URL
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
    async jwt(token, user, account, profile, isNewUser){
      
      if (token.account){
        
        //console.log('account', token.account.access_token);
      }
      
      
      return token
    }
  },
  debug: false
}

export default (req, res) => NextAuth(req, res, options)