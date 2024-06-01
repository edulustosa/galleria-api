import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { Status } from '@prisma/client'
import PrismaImagesRepository from '@/repositories/prisma/prisma-images-repository'
import PrismaUsersRepository from '@/repositories/prisma/prisma-users-repository'
import SubmitImageUseCase from '@/use-cases/images/submit-images'

describe('Submit image use-case', () => {
  const imagesRepository = new PrismaImagesRepository()
  const usersRepository = new PrismaUsersRepository()
  const sut = new SubmitImageUseCase(imagesRepository, usersRepository)

  it('should be able to submit an image', async () => {
    const user = await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    const image = await sut.execute({
      userId: user.id,
      title: 'artwork',
      url: 'https://image_url.com',
    })

    expect(image).toEqual(
      expect.objectContaining({
        userId: user.id,
        title: 'artwork',
        url: 'https://image_url.com',
        likes: 0,
        status: Status.PENDING,
      }),
    )
  })
})
