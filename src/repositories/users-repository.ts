import { Prisma, User } from '@prisma/client'

export interface EditInput {
  username?: string
  bio?: string
  profilePictureUrl?: string
}

export default interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByIdAndUpdate(id: string, data: EditInput): Promise<User | null>
}
