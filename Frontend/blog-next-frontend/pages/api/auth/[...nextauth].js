import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { get_KV } from '../../../data/mock_request/db_handler';

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),

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
    })
  ],
  debug: false
}

export default (req, res) => NextAuth(req, res, options)