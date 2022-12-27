import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

const mockPrisma = mockDeep<PrismaClient>();

jest.mock('./clients', () => ({
  prisma: mockPrisma,
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = mockPrisma as unknown as DeepMockProxy<PrismaClient>;

