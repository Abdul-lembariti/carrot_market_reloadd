// Import necessary modules and dependencies
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import db from '../../../lib/db'
import { NextApiResponse } from 'next'

// Create and export the authentication handler
const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async session({ session, token }) {
      if (!token) {
        throw new Error('Token not found.')
      }

      const { email, username } = token as { email: string; username: string }
      if (!email || !username) {
        throw new Error('Email or username not found in token.')
      }

      const user = await db.user.findUnique({
        where: { email: email },
      })

      if (!user) {
        await db.user.create({
          data: { email: email, username: username },
        })
      }

      return session
    },
    async signIn(param) {
      // Redirect user to '/profile' after successful sign-in
      return '/profile'
    },
  },
})

export default authHandler
