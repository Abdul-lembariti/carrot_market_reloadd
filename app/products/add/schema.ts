import { z } from 'zod'

export const productSchema = z.object({
  photo: z.string({
    required_error: 'Photo is Required',
  }),
  title: z.string({
    required_error: 'Title is Required',
  }),
  description: z.string({
    required_error: 'Description is Required',
  }),
  price: z.coerce.number({
    required_error: 'Price is Required',
  }),
})

export type ProductType = z.infer<typeof productSchema>
