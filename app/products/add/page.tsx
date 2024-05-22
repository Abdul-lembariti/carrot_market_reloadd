'use client'
import { Box } from '@chakra-ui/react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Input from '../../../component/input'
import Button from '../../../component/button'
import { useState } from 'react'
import { uploadProduct } from './action'

export default function AddProduct() {
  const [prev, setPrev] = useState('')
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
  return (
    <Box>
      <form action={uploadProduct} className="p-5 flex flex-col gap-5">
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
                Add Image
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
          name="title"
          type="text"
          placeholder="enter the name of product"
          required
        />
        <Input
          name="price"
          type="number"
          placeholder="enter the price of product"
          required
        />
        <Input
          name="description"
          type="text"
          required
          placeholder="Enter the description"
        />
        <Button text="Upload Product" />
      </form>
    </Box>
  )
}
