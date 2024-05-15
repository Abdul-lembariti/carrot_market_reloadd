'use server'
import { z } from 'zod'
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants'



const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Username must be String',
        required_error: 'The username is required',
      })
      .min(3, 'Username is too Short')  
      .trim()
      // .max(10, 'Username is too long')
      .refine(
        (username) => !username.match(/[A-Z]/),
        'Username should be in lowercase'
      ),
    email: z.string().email(),
    password: z 
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .toLowerCase()
      .regex(
        PASSWORD_REGEX,
        'Password must be strong which contains at least characters'
      ),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
    }
  })

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('password_confirm'),
  }
  const result = formSchema.safeParse(data)
  if (!result.success) {
    return result.error.flatten()
  }else{
    console.log(result.data)
  }
}
