import { beforeEach, expect, test } from 'vitest'

import { InMemoryAthleteRepository } from '../../../../../test/repository/in-memory-athlete-repository'
import { makeAthlete } from '../../../../../test/factory/make-athlete'
import { PaginatedListRequest } from '@/domain/shared/repository/paginated-list-request'

let inMemoryAthleteRepository: InMemoryAthleteRepository

beforeEach(() => {
  inMemoryAthleteRepository = new InMemoryAthleteRepository()
})

test('it should return a list of athletes', async () => {
  for (let i = 0; i < 33; i++) {
    await inMemoryAthleteRepository.create(makeAthlete())
  }

  const athletesPage1 = await inMemoryAthleteRepository.findPaginatedList(
    new PaginatedListRequest(1, 15)
  )

  expect(athletesPage1.items).toHaveLength(15)

  const athletesPage2 = await inMemoryAthleteRepository.findPaginatedList(
    new PaginatedListRequest(2, 15)
  )

  expect(athletesPage2.items).toHaveLength(15)

  const athletesPage3 = await inMemoryAthleteRepository.findPaginatedList(
    new PaginatedListRequest(3, 15)
  )

  expect(athletesPage3.items).toHaveLength(3)
})

test('it should return a empty list of athletes', async () => {
  const athletes = await inMemoryAthleteRepository.findPaginatedList(
    new PaginatedListRequest(1, 15)
  )
  0
  expect(athletes.total).toBe(0)
})
