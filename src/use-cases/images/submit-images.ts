import type ImagesRepository from '@/repositories/images-repository'
import type UsersRepository from '@/repositories/users-repository'
import {
  ImageAlreadyEvaluatedError,
  ImageDoesNotBelongToUserError,
  ResourceNotFoundError,
} from '../errors'
import { Status } from '@prisma/client'

interface SubmitImageRequest {
  userId: string
  title: string
  author?: string
  description?: string
  url: string
}

interface CancelSubmissionRequest {
  imageId: string
  userId: string
}

export default class SubmitImageUseCase {
  private imagesRepository: ImagesRepository
  private usersRepository: UsersRepository

  constructor(
    imagesRepository: ImagesRepository,
    usersRepository: UsersRepository,
  ) {
    this.imagesRepository = imagesRepository
    this.usersRepository = usersRepository
  }

  async send({ userId, title, author, description, url }: SubmitImageRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new ResourceNotFoundError()

    const image = await this.imagesRepository.create({
      userId,
      title,
      author,
      description,
      url,
    })

    return image
  }

  async cancel({ imageId, userId }: CancelSubmissionRequest) {
    const image = await this.imagesRepository.findById(imageId)

    if (!image) throw new ResourceNotFoundError()

    if (image.userId !== userId) {
      throw new ImageDoesNotBelongToUserError()
    }

    if (image.status !== Status.PENDING) {
      throw new ImageAlreadyEvaluatedError()
    }

    const deletedImage = await this.imagesRepository.findByIdAndDelete(imageId)

    return deletedImage
  }
}
