import { Box } from 'framer-motion'
import db from '../../../lib/db'
import Link from 'next/link'
import { formatDate } from '../../../lib/utitlity'
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/solid'

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      createdAt: true,
      _count: {
        select: {
          comments: true,
          Like: true,
        },
      },
    },
  })
  return posts
}

export const metadata = {
  title: 'Posts',
}

export default async function Chat() {
  const posts = await getPosts()
  return (
    <div className="p-5 flex flex-col">
      {posts.map((post) => (
        <Link
          className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex flex-col last:pb-0 last:border-b-0"
          key={post.id}
          href={`/posts/${post.id}`}>
          <h2 className="text-white text-lg font-semibolds">{post.title}</h2>
          <p className="mb-2">{post.description}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center ">
              <span>{formatDate(post.createdAt.toString())}</span>
              <span>.</span>
              <span>Views {post.views}</span>
            </div>
            <div className="flex gap-4 items-center">
              <span>
                <HandThumbUpIcon className="size-4" />
                {post._count.Like}
              </span>
              <span>
                <ChatBubbleBottomCenterIcon className="size-4" />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
