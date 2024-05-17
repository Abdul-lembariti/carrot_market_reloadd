'use server'
import { z } from 'zod'
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants'
import db from '../../lib/db'
import bcrypt from 'bcrypt'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string
  confirmPassword: string
}) => password === confirmPassword

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  })

  return !Boolean(user)
}

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  })
  return Boolean(user) === false
}

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
      )

      .refine(checkUniqueUsername, 'This username is already taken'),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(
        checkUniqueEmail,
        'There is an account already registered with that email.'
      ),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
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
    // log the user in
    const cookie = await getIronSession(cookies(), {
      cookieName: 'delicious-karrot',
      password: process.env.COOKIE_PASSWORD!,
    })
    //@ts-ignore
    cookie.id = user.id
    await cookie.save()
    // redirect "/home"
    redirect('/profile')
  }
}
