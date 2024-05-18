'use server'
import { z } from 'zod'
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants'
import db from '../../lib/db'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import getSession from '../../lib/session'

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string
  confirmPassword: string
}) => password === confirmPassword

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Username must be a string!',
        required_error: 'The username is required',
      })

      .trim()

      .refine(
        (username) => !username.match(/[A-Z]/),
        'Username should be in lowercase'
      ),

    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    })
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'This username already taken',
        path: ['username'],
        fatal: true,
      })
      return z.NEVER
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'This email already taken',
        path: ['email'],
        fatal: true,
      })
      return z.NEVER
    }
  })
  .refine(checkPasswords, {
    message: 'Password dont match',
    path: ['confirmPassword'],
  })

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('password_confirm'),
  }
  const result = await formSchema.safeParseAsync(data)
  if (!result.success) {
    console.log()
    return result.error.flatten()
  } else {
    const hashedpassword = await bcrypt.hash(result.data.password, 12)

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedpassword,
      },
      select: {
        id: true,
      },
    })
    const session = await getSession()
    session.id = user.id
    await session.save()
    redirect('/profile')
  }
}
