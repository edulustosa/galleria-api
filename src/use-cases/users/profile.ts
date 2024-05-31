import type UsersRepository from '@/repositories/users-repository'
import type { EditInput } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors'

interface EditProfileRequest {
  id: string
  data: EditInput
}

export default class ProfileUseCase {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async get({ id }: { id: string }) {
    const user = await this.usersRepository.findById(id)

    if (!user) throw new ResourceNotFoundError()

    return user
  }

  async edit({
    id,
    data: { username, bio, profilePictureUrl },
  }: EditProfileRequest) {
    const updatedUser = await this.usersRepository.findByIdAndUpdate(id, {
      username,
      bio,
      profilePictureUrl,
    })

    if (!updatedUser) throw new ResourceNotFoundError()

    return updatedUser
  }
}
