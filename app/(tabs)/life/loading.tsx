import { Box, Flex } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Box>
      {[...Array(10)].map((_, index) => (
        <Box
          key={index}
          borderRadius="md"
          display="flex"
          flexDirection="column"
          gap="10px">
          <Box bgColor="gray" borderRadius="6px" height="20px" width="100px" />
          <Box bgColor="gray" borderRadius="6px" height="20px" width="200px" />
          <Box display="flex" gap="0.25rem" mb="2rem">
            <Box
              bgColor="gray"
              borderRadius="6px"
              height="20px"
              width="1.25rem"
            />
            <Box
              bgColor="gray"
              borderRadius="6px"
              height="20px"
              width="1.25rem"
            />
          </Box>
        </Box>
      ))}
    </Box>
  )
}
