import { notFound, redirect } from 'next/navigation'
import db from '../../../lib/db'
import getSession from '../../../lib/session'
import { Box, Button, Image, Text } from '@chakra-ui/react'
import {
  ArrowLeftOnRectangleIcon,
  CameraIcon,
  UserIcon,
} from '@heroicons/react/24/solid'

async function getUser() {
  const session = await getSession()
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    })
    if (user) {
      return user
    }
  }
  notFound()
}

export default async function Profile() {
  const user = await getUser()

  const logOut = async () => {
    'use server'
    const session = await getSession()
    session.destroy()
    redirect('/')
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="space-between"
      padding="1rem">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem">
        <Box position="relative" width="150px" height="150px">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt=""
              height="150px"
              width="150px"
              borderRadius="100%"
              objectFit="cover"
            />
          ) : (
            <Box
              height="150px"
              width="150px"
              bgColor="gray"
              borderRadius="100%"
              display="flex"
              alignItems="center"
              justifyContent="center">
              <UserIcon height="50px" width="50px" />
            </Box>
          )}
          <Box
            position="absolute"
            bottom="0"
            right="0"
            borderRadius="100%"
            p="0.5rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px solid white"
            height="50px"
            width="50px">
            <CameraIcon height="30px" width="30px" color="black" />
          </Box>
        </Box>
        <Text fontSize="x-large" fontWeight="600">
          {user?.username}
        </Text>
        <Box
          border="1px solid black"
          padding="1rem"
          borderRadius="md"
          display="table">
          <Box display="table-row">
            <Text display="table-cell" fontWeight="bold" paddingRight="1rem">
              Email:
            </Text>
            <Text display="table-cell" color="red">
              {user.email}
            </Text>
          </Box>
          <Box display="table-row">
            <Text display="table-cell" fontWeight="bold" paddingRight="1rem">
              Phone:
            </Text>
            <Text display="table-cell">
              {user.phone ? user.phone : 'Not found'}
            </Text>
          </Box>
        </Box>
      </Box>
      <form
        action={logOut}
        style={{ marginTop: 'auto', marginBottom: '120px' }}>
        <button className="bg-red-600 text-white p-2 border-2 flex items-center justify-center">
          <ArrowLeftOnRectangleIcon
            height="20px"
            width="20px"
            style={{ marginRight: '0.5rem' }}
          />
          Log Out
        </button>
      </form>
    </Box>
  )
}
