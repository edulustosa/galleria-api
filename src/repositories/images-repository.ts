import { Prisma, Image } from '@prisma/client'

export default interface ImagesRepository {
  create(data: Prisma.ImageUncheckedCreateInput): Promise<Image>
}
