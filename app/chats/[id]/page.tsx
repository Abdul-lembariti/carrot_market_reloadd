import { notFound } from 'next/navigation'
import db from '../../../lib/db'
import getSession from '../../../lib/session'
import { Prisma } from '@prisma/client'
import ChatMessagesList from '../../../component/chat-room'

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: { id: true },
      },
    },
  })
  if (room) {
    const session = await getSession()
    const canSee = Boolean(room.users.find((user) => user.id === session.id))
    if (!canSee) {
      return null
    }
  }
  return room
}

async function getMessages(chatRoomId: string) {
  const message = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  })
  return message
}

export type IntialChatMessage = Prisma.PromiseReturnType<typeof getMessages>

export default async function chatRoom({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id)
  if (!room) {
    return notFound()
  }

  const initialMessages = await getMessages(params.id)
  const session = await getSession()

  return (
    <ChatMessagesList userId={session.id!} intialMessage={initialMessages} />
  )
}
/* ssdsdsdsdsddsdsddsdsdsdsxcxcxcdsdsdsd */
