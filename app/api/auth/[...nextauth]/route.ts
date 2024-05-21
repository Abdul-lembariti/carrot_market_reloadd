import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import db from '@/lib/db'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
    }
  }

  interface User {
    id: string
    email: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async signIn({ user, account, profile }) {
      const existingUser = await db.user.findUnique({
        where: { email: user.email ?? undefined },
      })

      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email as string,
            username: user.name ?? '',
            google_id: profile?.sub ?? '',
            avatar: user.image ?? '',
          },
        })
      }

      return true
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/profile`
    },
  },
})

export { handler as GET, handler as POST }
