import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { Status } from '@prisma/client'
import PrismaImagesRepository from '@/repositories/prisma/prisma-images-repository'
import PrismaUsersRepository from '@/repositories/prisma/prisma-users-repository'
import SubmitImageUseCase from '@/use-cases/images/submit-images'
import {
  ImageAlreadyEvaluatedError,
  ImageDoesNotBelongToUserError,
} from '@/use-cases/errors'

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

    const image = await sut.send({
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

  it('should be able to cancel a submission', async () => {
    const user = await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    const image = await sut.send({
      userId: user.id,
      title: 'artwork',
      url: 'https://image_url.com',
    })

    const deletedImage = await sut.cancel({
      imageId: image.id,
      userId: user.id,
    })

    expect(deletedImage).toEqual(image)

    const checkImage = await imagesRepository.findById(image.id)

    expect(checkImage).toBe(null)
  })

  it('should not be able to cancel a submission with a wrong id', async () => {
    const user = await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    const image = await imagesRepository.create({
      userId: user.id,
      title: 'Art title',
      url: 'http://image_url',
    })

    await expect(() =>
      sut.cancel({
        imageId: image.id,
        userId: 'wrong id',
      }),
    ).rejects.toBeInstanceOf(ImageDoesNotBelongToUserError)
  })

  it('should not be able to cancel a submission with a PENDING status', async () => {
    const user = await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    const image = await imagesRepository.create({
      userId: user.id,
      title: 'Art title',
      url: 'http://image_url',
      status: Status.APPROVED,
    })

    await expect(() =>
      sut.cancel({
        imageId: image.id,
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(ImageAlreadyEvaluatedError)
  })
})
