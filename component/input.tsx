import { InputHTMLAttributes } from 'react'

interface Iform {
  name: string
  errors?: string[]
}

export default function Input({
  name,
  errors = [],
  ...rest
}: Iform & InputHTMLAttributes<HTMLInputElement>) {
  console.log(rest)
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        {...rest}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 transition-all ring-neutral-200 focus:ring-orange-500 border-none px-4 placeholder:text-neutral-400"
      />

      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  )
}
