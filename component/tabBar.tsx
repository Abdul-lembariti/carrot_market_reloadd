'use client'
import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid'
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline'
// import Link from 'next/link'
import { Box, Flex, Link } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

export default function TabBar() {
  const pathname = usePathname()
  return (
    <Box
      position="fixed"
      bottom="0"
      width="full"
      marginX="auto"
      display="grid"
      gridColumn="5"
      borderTop="2px solid"
      borderColor="gray"
      color="white"
      paddingX="5px"
      bgColor="#80808075
      "
      paddingY="3px"
      gridTemplateColumns="repeat(5, 100px) ">
      <Link
        color="white"
        href="/products"
        className="flex flex-col items-center gap-px">
        {pathname === '/products' ? (
          <SolidHomeIcon height="30px" width="30px" />
        ) : (
          <OutlineHomeIcon height="30px" width="30px" />
        )}
        <span>Products</span>
      </Link>
      <Link
        color="white"
        href="/life"
        className="flex flex-col items-center gap-px  ">
        {pathname === '/life' ? (
          <SolidNewspaperIcon height="30px" width="30px" />
        ) : (
          <OutlineNewspaperIcon height="30px" width="30px" />
        )}
        <span>Life</span>
      </Link>
      <Link
        color="white"
        href="/live"
        className="flex flex-col items-center gap-px">
        {pathname === '/live' ? (
          <SolidVideoCameraIcon height="30px" width="30px" />
        ) : (
          <OutlineVideoCameraIcon height="30px" width="30px" />
        )}
        <span>Live Sales</span>
      </Link>
      <Link
        color="white"
        href="/chats"
        className="flex flex-col items-center gap-px">
        {pathname === '/chats' ? (
          <SolidChatIcon height="30px" width="30px" />
        ) : (
          <OutlineChatIcon height="30px" width="30px" />
        )}
        <span>Chats</span>
      </Link>
      <Link
        color="white"
        href="/profile"
        className="flex flex-col items-center gap-px">
        {pathname === '/profile' ? (
          <SolidUserIcon height="30px" width="30px" />
        ) : (
          <OutlineUserIcon height="30px" width="30px" />
        )}
        <span>Profile</span>
      </Link>
    </Box>
  )
}
