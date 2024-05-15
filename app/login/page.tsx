'use client'

import SocialLogin from '@/component/social-login'
import { useFormState } from 'react-dom'
import Input from '@/component/input'
import Button from '@/component/button'
import { login } from './action'
import { PASSWORD_MIN_LENGTH } from '../../lib/constants'

export default function Login() {
  // const [state, action] = useFormState(login, null)
  const [state, action] = useFormState(login, null)
  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Carrot Market Login</h1>
        <h2 className="text-xl">Login with Email and Password</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required={true}
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          min={PASSWORD_MIN_LENGTH}
          placeholder="Password"
          required={true}
          errors={state?.fieldErrors.password}
        />
        <Button text="Login" />
      </form>
      <span></span>
      <SocialLogin />
    </div>
  )
}
