'use client'

import { useFormState } from 'react-dom'
import Button from '@/component/button'
import SocialLogin from '@/component/social-login'
import { createAccount } from './action'
import Input from '@/component/input'

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null)
  return (
    <div className="flex flex-col gap-10 py-8 px-6 ">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Create Account</h1>
        <h2 className="text-xl">Fill the form below to join</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="password_confirm"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.fieldErrors.confirmPassword}
        />
        {/* <input
          type="text"
          className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 transition-all ring-neutral-200 focus:ring-orange-500 border-none px-4 placeholder:text-neutral-400"
        /> */}
        <Button text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  )
}
