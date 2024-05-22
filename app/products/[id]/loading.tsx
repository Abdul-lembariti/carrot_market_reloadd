import { Box } from '@chakra-ui/react'
import { PhotoIcon } from '@heroicons/react/24/solid'

export default function Loading() {
  return (
    <Box
      animation="pulse  2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      padding="1.25rem"
      display="flex"
      flexDirection="column"
      gap="1.25rem">
      <Box
        width="100%"
        height="25rem"
        border="0.2rem"
        borderStyle="dashed"
        borderColor="gray.200"
        borderRadius="md"
        display="flex"
        color="gray.700"
        justifyContent="center"
        alignItems="center">
        <PhotoIcon height="7rem" />
      </Box>
      <Box display="flex" gap="1rem" alignItems="center">
        <Box height="4rem" width="4rem" borderRadius="100%" bgColor="gray" />
        <Box display="flex" flexDirection="column" gap="0.5rem">
          <Box width="10rem" height="1.25rem" bgColor="gray" rounded="md" />
          <Box
            width="5rem"
            height="1.25rem"
            bgColor="gray"
            rounded="lg"
            borderX="2px"
            borderY="30px"
          />
        </Box>
      </Box>
      <Box width="20rem" height="1.25rem" bgColor="gray" rounded="" />
    </Box>
  )
}
