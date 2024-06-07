import { Prisma, Image } from '@prisma/client'

export default interface ImagesRepository {
  create(data: Prisma.ImageUncheckedCreateInput): Promise<Image>
  findById(id: string): Promise<Image | null>
  findByIdAndDelete(id: string): Promise<Image>
}
