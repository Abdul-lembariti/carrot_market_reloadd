import { Avatar, Box, Image, Button, Link, Text } from '@chakra-ui/react'
// import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import db from '../../../lib/db'
import { UserIcon } from '@heroicons/react/24/solid'
import { formatToTzs } from '../../../lib/utitlity'
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from 'next/cache'
import getSession from '../../../lib/session'

async function getOwner(userId: number) {
  // const session = await getSession()
  // if (session.id) {
  //   return session.id === userId
  // }
  return false
}

async function getProduct(id: number) {
  console.log('product')
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  })
  return product
}

const getCachedProduct = nextCache(getProduct, ['product-detail'], {
  tags: ['product-detail', 'xxx'],
})

async function getProductTitle(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  })
  return product
}

const getCachedProductTitle = nextCache(getProductTitle, ['product-title'], {
  tags: ['product-title', 'xxx'],
})

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCachedProductTitle(Number(params.id))
  return {
    title: `Product! ${product?.title}`,
  }
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string }
}) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return notFound()
  }
  const product = await getCachedProduct(id)
  const isOwner = await getOwner(product!.userId)
  if (!product) {
    return notFound()
  }

  const revalidate = async () => {
    'use server'
    revalidateTag('xxx')
  }

  const createChatRoom = async () => {
    "use server";
    const session = await getSession();
    const room = await db.chatRoom.create({
      data: {
        users: {
          connect: [
            {
              id: product.userId,
            },
            {
              id: session.id,
            },
          ],
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/chats/${room.id}`);
  };

  return (
    <Box>
      <Box>
        <Image
          objectFit="cover"
          width="100%"
          height="40rem"
          src={product.photo}
          alt={product.title}
          loading="eager"
        />
      </Box>
      <Box
        p="1.25rem"
        display="flex"
        alignItems="center"
        gap="0.95rem"
        borderBottom="2px solid gray">
        <Box width="2.5rem" height="2.5rem" rounded="100%" overflow="hidden">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
              loading="eager"
            />
          ) : (
            <UserIcon />
          )}
        </Box>
        <Box>
          <h3>{product.user.username}</h3>
        </Box>
      </Box>
      <Box p="1.25rem">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </Box>
      <Box
        pos="fixed"
        bottom="0"
        left="0"
        p="1.25rem"
        bgColor="#6c6a6a92"
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Text>{formatToTzs(product.price)}</Text>
        {isOwner ? (
          <form action={revalidate}>
            <Button
              py="0.6175rem"
              bgColor="orangered"
              rounded="10px"
              textColor="white"
              px="1.25rem">
              Revalidate
            </Button>
          </form>
        ) : null}
        <form action={createChatRoom}>
          <button className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Chats
          </button>
        </form>
      </Box>
    </Box>
  )
}

export const dynamicParams = true

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  })
  return products.map((product) => ({ id: product.id + '' }))
}
