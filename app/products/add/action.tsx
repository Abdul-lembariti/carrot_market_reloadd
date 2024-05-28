'use server'

import fs from 'fs/promises'
import db from '../../../lib/db'
import getSession from '../../../lib/session'
import { redirect } from 'next/navigation'
import { productSchema } from './schema'

export async function uploadProduct(_: any, formData: FormData) {
  try {
    const data = {
      photo: formData.get('photo'),
      title: formData.get('title'),
      price: formData.get('price'),
      description: formData.get('description'),
    }

    if (data.photo instanceof File) {
      const photoData = await data.photo.arrayBuffer()
      await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData))
      data.photo = `/${data.photo.name}`
    }

    const result = productSchema.safeParse(data)
    if (!result.success) {
      console.error(result.error.flatten())
      return result.error.flatten()
    } else {
      const session = await getSession()
      if (session.id) {
        const product = await db.product.create({
          data: {
            title: result.data.title,
            description: result.data.description,
            price: result.data.price,
            photo: result.data.photo,
            user: {
              connect: {
                id: session.id,
              },
            },
          },
          select: {
            id: true,
          },
        })
        redirect(`/products/${product.id}`)
      }
    }
  } catch (error) {
    console.error('Error uploading product:', error)
    throw new Error('Failed to upload product')
  }
}
