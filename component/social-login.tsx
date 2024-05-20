import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/16/solid'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-red-600" />
      <div className="flex flex-col gap-3">
        {/*         <button
          onClick={()=> signIn('google')}
          className="primary-btn flex h-10 items-center justify-center gap-3">
          <span>
            <Image width="25" height="25" src="/google.svg" alt="" />
          </span>
          <span>Continue with Google</span>
        </button>
 */}
        <Link
          href='/github/start'
          className="primary-btn flex h-10 items-center justify-center gap-3">
          <span>
            <Image width="25" height="25" src="/google.svg" alt="" />
          </span>
          <span>Continue with Google</span>
        </Link>
        <Link
          href="/sms"
          className="primary-btn flex h-10 items-center justify-center gap-3">
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
          </span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  )
}
