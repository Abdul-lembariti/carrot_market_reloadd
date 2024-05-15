'use client'

import { useFormState } from 'react-dom'
import Button from '@/component/button'
import SocialLogin from '@/component/social-login'
import { createAccount } from './action'
import Input from '@/component/input'

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null)
  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Create Account</h1>
        <h2 className="text-xl">Fill the form below to join</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required={true}
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
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
          placeholder="Password"
          required={true}
          errors={state?.fieldErrors.password}
        />
        <Input
          name="password_confirm"
          type="password"
          placeholder="Confirm Password"
          required={true}
          errors={state?.fieldErrors.confirmPassword}
        />
        <Button text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  )
}
