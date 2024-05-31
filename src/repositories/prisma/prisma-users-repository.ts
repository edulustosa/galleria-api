import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import type UsersRepository from '../users-repository'
import type { EditInput } from '../users-repository'

export default class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async findByIdAndUpdate(id: string, data: EditInput) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data,
      })

      return updatedUser
    } catch {
      // Prisma throws an error when an update where doesn't exists so I'm
      // returning null to handle this error myself
      return null
    }
  }
}
