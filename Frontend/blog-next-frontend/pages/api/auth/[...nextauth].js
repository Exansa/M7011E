import NextAuth from 'next-auth'
import {SessionProviders} from 'next-auth/react'

const options = {
  SessionProviders: [
    SessionProviders.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  debug: false
}

export default (req, res) => NextAuth(req, res, options)