import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import PrismaUsersRepository from '@/repositories/prisma/prisma-users-repository'
import ProfileUseCase from '@/use-cases/users/profile'
import { ResourceNotFoundError } from '@/use-cases/errors'

describe('User profile tests', () => {
  const usersRepository = new PrismaUsersRepository()
  const sut = new ProfileUseCase(usersRepository)

  it('should be able to get the user profile', async () => {
    const createdUser = await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    const user = await sut.get({ id: createdUser.id })

    expect(user).toEqual(
      expect.objectContaining({
        username: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('should not be able to get the user profile with and wrong id', async () => {
    await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    await expect(() => sut.get({ id: 'wrong id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should be able to edit the user profile', async () => {
    const user = await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    const updatedUser = await sut.edit({
      id: user.id,
      data: {
        username: 'foo',
        bio: 'bar',
        profilePictureUrl: 'https://image:url',
      },
    })

    expect(updatedUser).toEqual(
      expect.objectContaining({
        username: 'foo',
        bio: 'bar',
        profilePictureUrl: 'https://image:url',
      }),
    )
  })

  it('should not be able to edit the user profile with a wrong id', async () => {
    await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    await expect(() =>
      sut.edit({
        id: 'wrong id',
        data: {
          username: 'foo',
          bio: 'bar',
          profilePictureUrl: 'https://image:url',
        },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to edit specific fields', async () => {
    const user = await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    const updatedUser = await sut.edit({
      id: user.id,
      data: {
        username: 'foo',
        bio: 'bar',
      },
    })

    expect(updatedUser).toEqual(
      expect.objectContaining({
        username: 'foo',
        bio: 'bar',
      }),
    )

    expect(updatedUser.profilePictureUrl).toBe(null)
  })
})
