import type ImagesRepository from '@/repositories/images-repository'
import type UsersRepository from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors'

interface SubmitImageRequest {
  userId: string
  title: string
  author?: string
  description?: string
  url: string
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

  async execute({
    userId,
    title,
    author,
    description,
    url,
  }: SubmitImageRequest) {
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
}
