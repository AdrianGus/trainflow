import { beforeEach, expect, test } from 'vitest'

import { InMemoryAthleteRepository } from '../../../../../test/repository/in-memory-athlete-repository'
import { makeAthlete } from '../../../../../test/factory/make-athlete'

let inMemoryAthleteRepository: InMemoryAthleteRepository

beforeEach(() => {
  inMemoryAthleteRepository = new InMemoryAthleteRepository()
})

test('it should return an existent athlete by ID', async () => {
  const athlete = makeAthlete()

  inMemoryAthleteRepository.create(makeAthlete())

  expect(inMemoryAthleteRepository.items).toHaveLength(1)

  const foundAthlete = await inMemoryAthleteRepository.findOneById(athlete.id.toString())

  expect(foundAthlete).toBeDefined()
})

test('it should return null if not found any athlete by ID', async () => {
  const foundAthlete = await inMemoryAthleteRepository.findOneById('3124123')

  expect(foundAthlete).toBeNull()
})
