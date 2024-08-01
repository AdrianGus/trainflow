import { beforeEach, expect, test } from 'vitest'

import { InMemoryUserRepository } from '../../../../../test/repository/in-memory-user-repository'
import { makeUser } from '../../../../../test/factory/make-user'
import { PaginatedListRequest } from '@/domain/shared/repository/paginated-list-request'

let inMemoryUserRepository: InMemoryUserRepository

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository()
})

test('it should return a list of users', async () => {
  for (let i = 0; i < 33; i++) {
    await inMemoryUserRepository.create(makeUser())
  }

  const usersPage1 = await inMemoryUserRepository.findPaginatedList(new PaginatedListRequest(1, 15))

  expect(usersPage1.items).toHaveLength(15)

  const usersPage2 = await inMemoryUserRepository.findPaginatedList(new PaginatedListRequest(2, 15))

  expect(usersPage2.items).toHaveLength(15)

  const usersPage3 = await inMemoryUserRepository.findPaginatedList(new PaginatedListRequest(3, 15))

  expect(usersPage3.items).toHaveLength(3)
})

test('it should return a empty list of users', async () => {
  const users = await inMemoryUserRepository.findPaginatedList(new PaginatedListRequest(1, 15))
  0
  expect(users.total).toBe(0)
})
