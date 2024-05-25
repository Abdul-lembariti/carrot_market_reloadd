import { notFound } from 'next/navigation'
import db from '../../../lib/db'
import { Box, Button, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { formatDate } from '../../../lib/utitlity'
import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'
import {
  revalidatePath,
  unstable_cache as nextCache,
  revalidateTag,
} from 'next/cache'
import getSession from '../../../lib/session'
import LikeButton from '../../../component/likeButton'

/* async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })
    return post
  } catch (e) {
    return null
  }
}
const getCachedPost = nextCache(getPost, ['post-detail'], {
  tags: ['post-detail'],
  revalidate: 60,
})

async function getLikeStatus(postId: number) {
  const session = await getSession()
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  })
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  })
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  }
}

function getChachedlikedStatus(postId: number) {
  const cachedOperation = nextCache(getLikeStatus, ['product-like-status'], {
    tags: [`like-status-${postId}`],
  })
  return cachedOperation(postId)
}

export default async function PostDetail({
  params,
}: {
  params: { id: string }
}) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return notFound()
  }

  const post = await getCachedPost(id)
  if (!post) {
    return notFound()
  }

  const likePost = async () => {
    'use server'
    await new Promise((r) => setTimeout(r, 5000))
    const session = await getSession()
    try {
      await db.like.create({
        data: {
          postId: id,
          userId: session.id!,
        },
      })
      revalidateTag(`like-status-${id}`)
    } catch (e) {}
  }
  const dislikePost = async () => {
    'use server'
    try {
      const session = await getSession()
      await db.like.delete({
        where: {
          id: {
            postId: id,
            userId: session.id!,
          },
        },
      })
      revalidateTag(`like-status-${id}`)
    } catch (e) {}
  }

  const { likeCount, isLiked } = await getChachedlikedStatus(id)

  return (
    <Box p="1.25rem" textColor="white">
      <Box display="flex" alignItems="center" gap="0.25rem" mb="0.25rem">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <Box>
          <Text fontSize="small" fontWeight="semibold">
            {post.user.username}
          </Text>
          <Box fontSize="x-small">
            <Text>{formatDate(post.createdAt.toString())}</Text>
          </Box>
        </Box>
      </Box>
      <Text fontSize="larger" fontWeight="50%">
        {post.title}
      </Text>
      <p className="mb-5">{post.description}</p>
      <Box
        display="flex"
        flexDirection="column"
        gap="1.25rem"
        alignItems="start">
        <Box
          display="flex"
          alignItems="center"
          gap="0.25rem"
          textColor="gray"
          fontSize="small">
          <EyeIcon className="size-5" />
          <span>views {post.views}</span>
        </Box>
        <form action={isLiked ? dislikePost : likePost}>
          <Button
            display="flex"
            alignItems="center"
            gap="1.5rem"
            textColor="gray"
            fontSize="small"
            padding="1rem"
            border="2px solid gray"
            borderRadius="40px"
            color={isLiked ? 'white' : ''}
            bgColor={isLiked ? 'orangered' : ''}>
            <HandThumbUpIcon className="size-5" />
            <span>likes ({likeCount})</span>
          </Button>
        </form>
      </Box>
    </Box>
  )
}
 */

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: { id },
      data: { views: { increment: 1 } },
      include: {
        user: { select: { username: true, avatar: true } },
        _count: { select: { comments: true } },
      },
    })
    return post
  } catch (e) {
    return null
  }
}

const getCachedPost = nextCache(getPost, ['post-detail'], {
  tags: ['post-detail'],
  revalidate: 60,
})

async function getLikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: { id: { postId, userId } },
  })
  const likeCount = await db.like.count({ where: { postId } })
  return { likeCount, isLiked: Boolean(isLiked) }
}

const createCachedLikeStatus = (postId: number, userId: number) => {
  const cacheKey = `like-status-${postId}-${userId}`
  return nextCache(() => getLikeStatus(postId, userId), [cacheKey], {
    tags: [cacheKey],
  })()
}

export default async function PostDetail({
  params,
}: {
  params: { id: string }
}) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return notFound()
  }

  const post = await getCachedPost(id)
  if (!post) {
    return notFound()
  }

  const session = await getSession()
  const userId = session.id!

  const { likeCount, isLiked } = await createCachedLikeStatus(id, userId)

  return (
    <Box p="1.25rem" textColor="white">
      <Box display="flex" alignItems="center" gap="0.25rem" mb="0.25rem">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <Box>
          <Text fontSize="small" fontWeight="semibold">
            {post.user.username}
          </Text>
          <Box fontSize="x-small">
            <Text>{formatDate(post.createdAt.toString())}</Text>
          </Box>
        </Box>
      </Box>
      <Text fontSize="larger" fontWeight="50%">
        {post.title}
      </Text>
      <p className="mb-5">{post.description}</p>
      <Box
        display="flex"
        flexDirection="column"
        gap="1.25rem"
        alignItems="start">
        <Box
          display="flex"
          alignItems="center"
          gap="0.25rem"
          textColor="gray"
          fontSize="small">
          <EyeIcon className="size-5" />
          <span>views {post.views}</span>
        </Box>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </Box>
    </Box>
  )
}
