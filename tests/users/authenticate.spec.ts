import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import PrismaUsersRepository from '@/repositories/prisma/prisma-users-repository'
import AuthenticateUseCase from '@/use-cases/users/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors'

describe('Authenticate use-case', () => {
  const usersRepository = new PrismaUsersRepository()
  const sut = new AuthenticateUseCase(usersRepository)

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    const user = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(user).toEqual(
      expect.objectContaining({
        username: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'wrong@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
