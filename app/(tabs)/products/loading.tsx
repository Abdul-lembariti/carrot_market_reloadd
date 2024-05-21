import { Box } from '@chakra-ui/react'

export default function Loading() {
  return (
    <div className="p-5 flex flex-col gap-5 animate-pulse">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex *:rounded-md gap-5 ">
          <Box
            bgColor="grey"
            width="7rem"
            height="7rem"
            borderRadius="0.5rem"
          />
          <Box display="flex" flexDirection="column" gap="20px">
            <Box
              bgColor="grey"
              borderRadius="6px"
              height="20px"
              width="200px"
            />
            <Box
              bgColor="grey"
              borderRadius="6px"
              height="20px"
              width="100px"
            />
            <Box bgColor="grey" borderRadius="6px" height="20px" width="50px" />
          </Box>
        </div>
      ))}
    </div>
  )
}
