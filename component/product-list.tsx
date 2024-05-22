'use client'

import { Box, Text } from '@chakra-ui/react'
import { IntialProducts } from '../app/(tabs)/products/page'
import ListProduct from './list-product'
import { useEffect, useRef, useState } from 'react'
import getMoreProducts from '../app/(tabs)/products/actions'

interface ProductListProps {
  intialProducts: IntialProducts
}

export default function ProductList({ intialProducts }: ProductListProps) {
  const [products, setProducts] = useState(intialProducts)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const trigger = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0]
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current)
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
      },
      {
        threshold: 1.0,
      }
    )
    if (trigger.current) {
      observer.observe(trigger.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [page])

  return (
    <Box padding="1.25rem" display="flex" flexDirection="column" gap="1.25rem">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}

      {!isLastPage ? (
        <Text
          ref={trigger}
          style={{
            marginTop: `${page + 1 * 900}vh`,
          }}
          mb="10rem"
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
        </Text>
      ) : null}
    </Box>
  )
}

/*  */
