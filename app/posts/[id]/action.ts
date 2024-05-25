'use server'

import { revalidateTag } from 'next/cache'
import db from '../../../lib/db'
import getSession from '../../../lib/session'

export async function likePost(postId: number) {
  await new Promise((r) => setTimeout(r, 100))
  const session = await getSession()
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    })
    revalidateTag(`like-status-${postId}`)
  } catch (e) {}
}

export default async function dislikePost(postId: number) {
  await new Promise((r) => setTimeout(r, 5000))
  try {
    const session = await getSession()
    await db.like.delete({
      where: {
        id: {
          userId: session.id!,
          postId,
        },
      },
    })
    revalidateTag(`like-status-${postId}`)
  } catch (e) {}
}
