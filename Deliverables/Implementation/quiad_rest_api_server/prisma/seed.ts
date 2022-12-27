import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

;(async () => {
  await prisma.role.create({
    data: {
      name: 'standard',
      operations:{
        connectOrCreate: [
          {
            create: {
              name: "node:read"
            },
            where: {
              name: "node:read"
            }
          },
          {
            create: {
              name: "node:create"
            },
            where: {
              name: "node:create"
            }
          },
          {
            create: {
              name: "node:update"
            },
            where: {
              name: "node:update"
            }
          },
          {
            create: {
              name: "document:search"
            },
            where: {
              name: "document:search"
            }
          }
        ]
      } 
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
