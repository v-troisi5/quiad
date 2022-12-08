import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

;(async () => {
  await prisma.operation.createMany({
    data: [
      {
        name: 'node:create',
      },
      {
        name: 'node:read',
      },
    ],
  });
  await prisma.role.create({
    data: {
      name: 'standard',
    },
  })
  await prisma.role.create({
    data: {
      name: 'curator',
    },
  })
  await prisma.role.create({
    data: {
      name: 'supervisor',
    },
  })
})()
