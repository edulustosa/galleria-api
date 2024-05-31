import { PrismaClient } from '@prisma/client'
import { beforeEach, afterAll } from 'vitest'

const prisma = new PrismaClient()

beforeEach(async () => {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`,
        )
      } catch (err) {
        console.error(err)
      }
    }
  }
})

afterAll(async () => {
  await prisma.$disconnect()
})
