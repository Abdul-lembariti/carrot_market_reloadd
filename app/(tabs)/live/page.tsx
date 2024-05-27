'use client'

import { Link } from '@chakra-ui/react'
import { PlusIcon } from '@heroicons/react/24/solid'

export default function Chat() {
  return (
    <div>
      <h1 className="text-white text-4xl">Live Stream</h1>
      <Link
        href="/streams/add"
        bgColor="orangered"
        display="flex"
        alignItems="center"
        justifyContent="center"
        rounded="100%"
        width="3rem"
        height="3rem"
        pos="fixed"
        bottom="5rem"
        right="2rem"
        textColor="white"
        _hover={{
          opacity: 0.8,
        }}>
        <PlusIcon className="size-10" />
      </Link>
    </div>
  )
}
