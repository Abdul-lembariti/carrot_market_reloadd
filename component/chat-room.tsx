'use client'
import { useEffect, useRef, useState } from 'react'
import { IntialChatMessage } from '../app/chats/[id]/page'
import { Box, Button, Image, Input, Text } from '@chakra-ui/react'
import { formatDate } from '../lib/utitlity'
import { createClient, RealtimeChannel } from '@supabase/supabase-js'
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import { saveMessage } from '../app/chats/actions'

const SUPABASE_URL = 'https://mfsjixorxcbzwyxggkcs.supabase.co'

const PUBLIC_SUBAB =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mc2ppeG9yeGNiend5eGdna2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5MzA2NzQsImV4cCI6MjAzMTUwNjY3NH0.Qh78389ZnAedG7-n_yesanhufW8cjwTolha-vA0E6eE'

interface ChatsProp {
  intialMessage: IntialChatMessage
  userId: number
  chatRoomId: string
  username: string
  avatar: string
}

export default function ChatMessagesList({
  intialMessage,
  userId,
  chatRoomId,
  username,
  avatar,
}: ChatsProp) {
  const [messages, setMessages] = useState(intialMessage)
  const [message, setMessage] = useState('')
  const channel = useRef<RealtimeChannel>()
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setMessage(value)
  }
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessages((prevMsg) => [
      ...prevMsg,
      {
        id: Date.now(),
        payload: message,
        createdAt: new Date(),
        userId,
        user: {
          username: 'string',
          avatar: '',
        },
      },
    ])
    channel.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: {
        id: Date.now(),
        createdAt: new Date(),
        payload: message,
        userId,
        user: {
          username,
          avatar,
        },
      },
    })
    await saveMessage(message, chatRoomId)
    setMessage('')
  }

  useEffect(() => {
    const client = createClient(SUPABASE_URL, PUBLIC_SUBAB)
    channel.current = client.channel(`room-${chatRoomId}`)
    channel.current
      .on('broadcast', { event: 'message' }, (payload) => {
        setMessages((prevMsgs) => [...prevMsgs, payload.payload])
      })
      .subscribe()
    return () => {
      channel.current?.unsubscribe()
    }
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      minH="100vh"
      p="5"
      gap="5">
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
          {message.userId !== userId ? (
            <Image
              width="2rem"
              height="2rem"
              borderRadius="100%"
              rounded="100%"
              src={message.user.avatar!}
              alt={message.user.username}
            />
          ) : (
            ''
          )}
          <Box
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            justifyContent={
              message.userId === userId ? 'flex-start' : 'flex-end'
            }
            alignSelf={message.userId === userId ? 'flex-start' : 'flex-end'}>
            <Text
              bgColor={message.userId === userId ? 'gray' : '#ff7b00'}
              p="0.5rem"
              className="rounded-md">
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
          height="10%"
          mb="30px"
          focusBorderColor="red"
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
    </Box>
  )
}
