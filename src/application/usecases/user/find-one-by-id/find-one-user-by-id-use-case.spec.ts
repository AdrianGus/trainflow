import { beforeEach, expect, test } from 'vitest'

import { InMemoryUserRepository } from '../../../../../test/repository/in-memory-user-repository'
import { makeUser } from '../../../../../test/factory/make-user'

let inMemoryUserRepository: InMemoryUserRepository

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository()
})

test('it should return an existent user by ID', async () => {
  const user = makeUser()

  inMemoryUserRepository.create(makeUser())

  expect(inMemoryUserRepository.items).toHaveLength(1)

  const foundUser = await inMemoryUserRepository.findOneById(user.id.toString())

  expect(foundUser).toBeDefined()
})

test('it should return null if not found any user by ID', async () => {
  const foundUser = await inMemoryUserRepository.findOneById('3124123')

  expect(foundUser).toBeNull()
})
