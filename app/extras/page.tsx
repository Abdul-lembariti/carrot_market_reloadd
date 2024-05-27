import { Box, Text } from '@chakra-ui/react'
import HackedComponent from '../../component/hacked'
import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from 'react'

function getData() {
  const key = {
    apiKey: '2323',
    secret: '1212',
  }
  // experimental_taintObjectReference('API Keys were leaked', secret) for the all objct
  experimental_taintUniqueValue('Secrect key exposed', key, key.secret) //for the unique one only
  return key
}

export default async function Extras() {
  const data = getData()
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
      {/* <HackedComponent data={data} /> */}
    </Box>
  )
}
