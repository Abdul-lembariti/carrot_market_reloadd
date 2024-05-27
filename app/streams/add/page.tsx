'use client'
import { Button } from '@chakra-ui/react'
import Input from '../../../component/input'
import { useFormState } from 'react-dom'
import { startStream } from './action'

export default function AddStream() {
  const [state, action] = useFormState(startStream, null)
  return (
    <form className="p-5 flex flex-col gap-2" action={action}>
      <Input
        name="title"
        required
        placeholder="Title or your Stream"
        errors={state?.formErrors}
      />
      <Button>Start Recording</Button>
    </form>
  )
}
