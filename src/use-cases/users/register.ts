import { hash } from 'bcryptjs'
import type UsersRepository from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '../errors'

interface RegisterUseCaseRequest {
  username: string
  email: string
  password: string
}

export default class RegisterUseCase {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ username, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      username,
      email,
      passwordHash,
    })

    return user
  }
}
