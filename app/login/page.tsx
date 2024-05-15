'use client'

import FormInput from '@/component/form-input'
import FormButton from '@/component/form-btn'
import SocialLogin from '@/component/social-login'

export default function Login() {
  const onClick = async () => {
    const response = await fetch('/www/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'dula',
        password: '123',
      }),
    })
    console.log(await response.json())
  }

  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Carrot Market Login</h1>
        <h2 className="text-xl">Login with Email and Password</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="email"
          placeholder="Email"
          required={true}
          errors={['']}
        />
        <FormInput
          type="password"
          placeholder="Password"
          required={true}
          errors={['']}
        />
      </form>
      <span onClick={onClick}>
        <FormButton loading={false} text="Login" />
      </span>
      <SocialLogin />
    </div>
  )
}
