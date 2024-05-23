'use client'
import { Box } from '@chakra-ui/react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Input from '../../../component/input'
import Button from '../../../component/button'
import { useState } from 'react'
import { uploadProduct } from './action'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, ProductType } from './schema'

export default function AddProduct() {
  const [prev, setPrev] = useState('')
  const {
    register,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  })

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event
    if (!files) {
      return
    }
    const file = files[0]
    const url = URL.createObjectURL(file)
    setPrev(url)
  }

  const [state, action] = useFormState(uploadProduct, null)

  return (
    <Box>
      <form action={action} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${prev})`,
          }}>
          {prev === '' ? (
            <>
              <PhotoIcon width="4rem" />
              <Box textColor="gray.50" fontSize="small">
                Add Image {state?.fieldErrors.photo}
              </Box>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          hidden
        />
        <Input
          type="text"
          placeholder="enter the name of product"
          required
          errors={[errors.title?.message ?? '']}
          {...register('title')}
        />
        <Input
          type="number"
          placeholder="enter the price of product"
          required
          errors={[errors.price?.message ?? '']}
          {...register('price')}
        />
        <Input
          type="text"
          required
          placeholder="Enter the description"
          errors={[errors.description?.message ?? '']}
          {...register('description')}
        />
        <Button text="Upload Product" />
      </form>
    </Box>
  )
}


