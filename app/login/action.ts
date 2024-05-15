'use server'

import { z } from 'zod'
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '../../lib/constants'

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string({ required_error: 'Passowrd is required' })
    .min(PASSWORD_MIN_LENGTH)
    .regex(
      PASSWORD_REGEX,
      'Password should contain at least number,text,en Char'
    ),
})

export async function login(state:any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const result = formSchema.safeParse(data)
  if (!result.success) {
    return result.error.flatten()
  } else {
    console.log(result.data)
  }
}
