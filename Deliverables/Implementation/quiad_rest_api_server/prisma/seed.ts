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
              name: "node:delete"
            },
            where: {
              name: "node:delete"
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
  await prisma.category.createMany({
    data: [
      {
        description: "Certificato di nascita"
      },
      {
        description: "Certificato di morte"
      },
      {
        description: "Certificato di matrimonio"
      },
      {
        description: "Registro di leva"
      },
      {
        description: "Censimento"
      },
      {
        description: "Giornale"
      },
      {
        description: "Lettera"
      },
      {
        description: "Scritto personale"
      },
      {
        description: "Iconografia"
      },
      {
        description: "Altro"
      }
    ]
  })
})()
