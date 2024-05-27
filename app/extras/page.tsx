import { Box, Text } from '@chakra-ui/react'

async function getData() {
  const data = await fetch(
    'https://nomad-movies.nomadcoders.workers.dev/movies'
  )
}

export default async function Extras() {
  await getData()
  return (
    <Box
      display="flex"
      flexDirection="column"
      py="5rem"
      gap="1rem"
      alignItems="center">
      <Text fontSize="xxx-large" className="font-rubick">
        Extras!
      </Text>
      <p className="font-roboto">So much to learn</p>
    </Box>
  )
}
