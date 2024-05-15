import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import FormInput from '../../component/form-input'
import FormButton from '../../component/form-btn'
import SocialLogin from '../../component/social-login'

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="number"
          placeholder="Phone Number"
          required={true}
          errors={['']}
        />
        <FormInput
          type="number"
          placeholder="Verfication Code"
          required={true}
          errors={['']}
        />

        <FormButton loading={false} text="Verify" />
      </form>
    </div>
  )
}
