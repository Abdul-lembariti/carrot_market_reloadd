'use client'

import { Box, Button } from '@chakra-ui/react'
import { IntialProducts } from '../app/(tabs)/products/page'
import ListProduct from './list-product'
import { useState } from 'react'
import getMoreProducts from '../app/(tabs)/products/actions'

interface ProductListProps {
  intialProducts: IntialProducts
}

export default function ProductList({ intialProducts }: ProductListProps) {
  const [products, setProducts] = useState(intialProducts)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)

  const onLoadMoreProducts = async () => {
    setLoading(true)
    const newProducts = await getMoreProducts(page + 1)
    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1)
      setProducts((prev) => [...prev, ...newProducts])
    } else {
      setIsLastPage(true)
    }
    setLoading(false)
  }

  return (
    <Box padding="1.25rem" display="flex" flexDirection="column" gap="1.25rem">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {isLastPage ? (
        'No more items'
      ) : (
        <Button
          onClick={onLoadMoreProducts}
          disabled={loading}
          fontSize="sm"
          fontWeight="semibold"
          bgColor="orangered"
          width="fit-content"
          mx="auto"
          px="2.5rem"
          py="1rem"
          rounded="10px"
          _hover={{ opacity: 0.9 }}
          css={{
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}>
          {loading ? 'Get Products..' : 'Load More'}
        </Button>
      )}
    </Box>
  )
}

/*  */
