import { Box } from '@chakra-ui/react'

import db from '../../../lib/db'
import ProductList from '../../../component/product-list'
import { Prisma } from '@prisma/client'

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
      createdAt: 'desc',
    },
  })
  return products
}

export type IntialProducts = Prisma.PromiseReturnType<typeof getProducts>

export default async function Product() {
  const initialProduct = await getProducts()
  return (
    <Box>
      <ProductList intialProducts={initialProduct} />
    </Box>
  )
}
