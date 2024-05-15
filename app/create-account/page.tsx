import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import FormInput from '../../component/form-input'
import FormButton from '../../component/form-btn'
import SocialLogin from '../../component/social-login'

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Create Account</h1>
        <h2 className="text-xl">Fill the form below to join</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="text"
          placeholder="Username"
          required={true}
          errors={['']}
        />
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
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required={true}
          errors={['']}
        />
        <FormButton loading={false} text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  )
}
