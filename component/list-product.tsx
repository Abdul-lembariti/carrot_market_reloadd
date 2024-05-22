// import { Box, Link } from '@chakra-ui/react'
import { Box, Text, Link, Image } from '@chakra-ui/react'
// import Image from 'next/image'
import { formatDate, formatToTzs } from '../lib/utitlity'
// import Link from 'next/link'

interface ListProductProps {
  title: string
  price: number
  createdAt: Date
  photo: string
  id: number
}

export default function ListProduct({
  title,
  price,
  createdAt,
  photo,
  id,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} display="flex" gap="1.5rem" color="white">
      <Box
        position="relative"
        height="8rem"
        width="8rem"
        borderRadius="0.7rem"
        overflow="hidden">
        <Image
          // className="object-cover"
          objectFit="cover"
          src={photo}
          alt={title}
          loading="eager"></Image>
      </Box>
      <Box display="flex" flexDirection="column" gap="1">
        <Text font-size="md ">{title}</Text>
        <Text fontSize="sm" color="gray.500">
          {formatDate(createdAt.toString())}
        </Text>
        <Text fontSize="md" fontWeight="semibold">
          {formatToTzs(price)}
        </Text>
      </Box>
    </Link>
  )
}
