'use client'

import { Box, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import ListProduct from './list-product'
import getMoreProducts from '../app/(tabs)/products/actions'
import { IntialProducts } from '../app/(tabs)/products/page'

interface ProductListProps {
  initialProducts: IntialProducts
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts)
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
        <Text mx="auto">No more items</Text>
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
          {loading ? 'Getting Products...' : 'Load More'}
        </Button>
      )}
    </Box>
  )
}
