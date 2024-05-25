'use client'
import { useState } from 'react'
import { IntialChatMessage } from '../app/chats/[id]/page'
import { Box, Button, Image, Input, Text } from '@chakra-ui/react'
import { formatDate } from '../lib/utitlity'
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'

interface ChatsProp {
  intialMessage: IntialChatMessage
  userId: number
}

export default function ChatMessagesList({ intialMessage, userId }: ChatsProp) {
  const [messages, setMessages] = useState(intialMessage)
  const [message, setMessage] = useState('')
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setMessage(value)
  }
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    alert(message)
    setMessage('')
  }
  return (
    <div className="p-5 min-h-screen justify-end flex flex-col gap-5">
      {messages.map((message) => (
        <Box
          key={message.id}
          display="flex"
          gap="0.25rem"
          alignItems="center"
          justifyContent={message.userId === userId ? 'flex-end' : 'flex-start'}
          flexDirection={message.userId === userId ? 'row-reverse' : 'row'}
          padding="0.5rem"
          borderRadius="10px"
          maxWidth="60%"
          alignSelf={message.userId === userId ? 'flex-end' : 'flex-start'}
          mb="0.5rem">
          <Image
            width="2rem"
            height="2rem"
            borderRadius="100%"
            rounded="100%"
            src={message.user.avatar!}
            alt={message.user.username}
          />
          <Box
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            justifyContent={
              message.userId === userId ? 'flex-start' : 'flex-end'
            }
            alignSelf={message.userId === userId ? 'flex-start' : 'flex-end'}>
            <Text bgColor="#ff7b00" p="0.5rem" className="rounded-md">
              {message.payload}
            </Text>
            <Text fontSize="x-small">
              {formatDate(message.createdAt.toString())}
            </Text>
          </Box>
        </Box>
      ))}
      <form className="flex relative" onSubmit={onSubmit}>
        <Input
          required
          onChange={onChange}
          value={message}
          bg="transparent"
          borderRadius="full"
          width="100%"
          height="10"
          focusBorderColor="transparent"
          px="5"
          ring="2"
          _focus={{
            ring: '4',
            ringColor: 'neutral.50',
          }}
          transition="ring 0.2s"
          ringColor="neutral.200"
          border="none"
          placeholder="Enter your text here"
          type="text"
          name="message"
        />
        <Button pos="absolute" right="0">
          <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
        </Button>
      </form>
    </div>
  )
}
