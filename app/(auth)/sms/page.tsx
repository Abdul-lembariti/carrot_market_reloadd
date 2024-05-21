'use client'
import { useFormState } from 'react-dom'
import Button from '../../../component/button'
import Input from '../../../component/input'
import { smsVerification } from './action'

const intialState = {
  token: false,
  error: undefined,
}

export default function SMSLogin() {
  const [state, action] = useFormState(smsVerification, intialState)
  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verfication Code"
            required
            min={100000}
            max={9999999}
          />
        ) : (
          <Input
            name="phone"
            type="text"
            placeholder="Phone Number"
            required
            errors={state.error?.formErrors}
          />
        )}

        <Button text={state.token ? 'Verify Token' : 'Request Code'} />
      </form>
    </div>
  )
}

/* */
