import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'
import PrismaUsersRepository from '@/repositories/prisma/prisma-users-repository'
import RegisterUseCase from '@/use-cases/users/register'
import { UserAlreadyExistsError } from '@/use-cases/errors'

describe('Register use-case', () => {
  const usersRepository = new PrismaUsersRepository()
  const sut = new RegisterUseCase(usersRepository)

  it('should be able to register', async () => {
    const user = await sut.execute({
      username: 'John Doe',
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

  it('should hash user password upon registration', async () => {
    const user = await sut.execute({
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    if (user.passwordHash === '12345678') {
      throw new Error('Password not hashed')
    }

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      user.passwordHash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same e-mail twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      username: 'John Doe',
      email,
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        username: 'John Doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
