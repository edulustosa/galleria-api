import { compare } from 'bcryptjs'
import type UsersRepository from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../errors'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export default class AuthenticateUseCase {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.passwordHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return user
  }
}
