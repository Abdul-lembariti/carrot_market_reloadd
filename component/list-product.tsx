'use client'
import {
  Box,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { formatDate, formatToTzs } from '../lib/utitlity'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  const handleModalClick = () => {
    router.push(`/products/${id}`)
  }

  return (
    <Link href={`/products/${id}`} className="flex gap-6 text-white">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <Box
          display="flex"
          gap="1.5rem"
          color="white"
          onClick={onOpen}
          cursor="pointer">
          <Box
            position="relative"
            height="8rem"
            width="8rem"
            borderRadius="0.7rem"
            overflow="hidden">
            <Image objectFit="cover" src={photo} alt={title} loading="eager" />
          </Box>
          <Box display="flex" flexDirection="column" gap="1" mt="2rem">
            <Text fontSize="md">{title}</Text>
            <Text fontSize="sm" color="gray.500">
              {formatDate(createdAt.toString())}
            </Text>
            <Text fontSize="md" fontWeight="semibold">
              {formatToTzs(price)}
            </Text>
          </Box>
        </Box>

        {/* <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody onClick={handleModalClick} cursor="pointer">
            <Image
              objectFit="cover"
              src={photo}
              alt={title}
              loading="eager"
              mb="1rem"
              width="50%"
              height="50%"
            />
            <Box textAlign="center" mt="1rem">
              <Text fontSize="sm" fontWeight="bold">
                {title}
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal> */}
      </Box>
    </Link>
  )
}


