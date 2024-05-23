'use server'

import db from '../../../lib/db'

export default async function getMoreProducts(page: number) {
  const productsPerPage = 1 
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      createdAt: true,
      photo: true,
      id: true,
    },
    skip: page * productsPerPage,
    take: productsPerPage,
    orderBy: {
      createdAt: 'asc',
    },
  })
  return products
}
