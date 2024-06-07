import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import type ImagesRepository from '../images-repository'

export default class PrismaImagesRepository implements ImagesRepository {
  async create(data: Prisma.ImageUncheckedCreateInput) {
    const image = await prisma.image.create({ data })

    return image
  }

  async findById(id: string) {
    const image = await prisma.image.findUnique({
      where: { id },
    })

    return image
  }

  async findByIdAndDelete(id: string) {
    const deletedImage = await prisma.image.delete({
      where: { id },
    })

    return deletedImage
  }
}
