import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

interface SessionContent {
  id?: number
}

export default function getSession() {
  const cookie = cookies()
  return getIronSession<SessionContent>(cookie, {
    cookieName: 'delicious-karrot',
    password: process.env.COOKIE_PASSWORD!,
  })
}
