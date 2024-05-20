import NextAuth from 'next-auth'
import authHandler from '../../rt/auth'

const handler = NextAuth(authHandler)
export { handler as GET, handler as POST }
