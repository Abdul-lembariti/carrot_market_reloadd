'use server'

import { z } from 'zod'

import bcrypt from 'bcrypt'
import db from '../../../lib/db'
import getSession from '../../../lib/session'
import { redirect } from 'next/navigation'

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  })
  return Boolean(user)
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, 'An Account with this email dont exists'),
  password: z.string({ required_error: 'Password is required' }),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(
  //   PASSWORD_REGEX,
  //   'Password should contain at least number,text,en Char'
  // ),
})

export async function login(state: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const result = await formSchema.spa(data)
  if (!result.success) {
    return result.error.flatten()
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    })
    const ok = await bcrypt.compare(result.data.password, user!.password ?? '')
    if (ok) {
      const session = await getSession()
      session.id = user!.id
      session.save()
      redirect('/profile')
    } else {
      return {
        fieldErrors: {
          password: ['Wrong Password'],
          email: [],
        },
      }
    }
  }
}
