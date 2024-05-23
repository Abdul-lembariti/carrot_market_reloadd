import { Box, Link } from '@chakra-ui/react'
import db from '../../../lib/db'
import ProductList from '../../../component/product-list'
import { Prisma } from '@prisma/client'
import { PlusIcon } from '@heroicons/react/24/solid'

async function getProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      createdAt: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      createdAt: 'asc',
    },
  })
  return products
}

export type IntialProducts = Prisma.PromiseReturnType<typeof getProducts>

export default async function Product() {
  const initialProduct = await getProducts()
  return (
    <Box>
      <ProductList initialProducts={initialProduct} />
      <Link
        href="/products/add"
        bgColor="orangered"
        display="flex"
        alignItems="center"
        justifyContent="center"
        rounded="100%"
        width="3rem"
        height="3rem"
        pos="fixed"
        bottom="5rem"
        right="2rem"
        textColor="white"
        _hover={{
          opacity: 0.8,
        }}>
        <PlusIcon className="size-10" />
      </Link>
    </Box>
  )
}
