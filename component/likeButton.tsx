'use client'
import { Button } from '@chakra-ui/react'
import { HandThumbUpIcon } from '@heroicons/react/24/solid'
import dislikePost, { likePost } from '../app/posts/[id]/action'
import { useOptimistic } from 'react'

interface LikeButton {
  isLiked: boolean
  likeCount: number
  postId: number
}

export default function LikeButton({ isLiked, likeCount, postId }: LikeButton) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => {
      return {
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1
          : previousState.likeCount + 1,
      }
    }
  )
  const onClick = async () => {
    reducerFn(undefined)
    if (isLiked) {
      await dislikePost(postId)
    } else {
      await likePost(postId)
    }
  }
  return (
    <Button
      onClick={onClick}
      display="flex"
      alignItems="center"
      gap="1.5rem"
      textColor="gray"
      fontSize="small"
      padding="1rem"
      border="2px solid gray"
      borderRadius="40px"
      color={state.isLiked ? 'white' : ''}
      bgColor={state.isLiked ? 'orangered' : ''}>
      <HandThumbUpIcon className="size-5" />
      {state.isLiked ? (
        <span>{state.likeCount}</span>
      ) : (
        <span>Likes ({state.likeCount})</span>
      )}
    </Button>
  )
}
