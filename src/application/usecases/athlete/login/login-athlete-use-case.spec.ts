import { beforeEach, expect, test } from 'vitest'
import { InMemoryAthleteRepository } from '../../../../../test/repository/in-memory-athlete-repository'
import { makeAthlete } from '../../../../../test/factory/make-athlete'
import { LoginAthleteUseCase } from './login-athlete-use-case'
var bcrypt = require('bcryptjs')

let inMemoryAthleteRepository: InMemoryAthleteRepository

beforeEach(() => {
  inMemoryAthleteRepository = new InMemoryAthleteRepository()
})

test('it should login a existent athlete', async () => {
  const athlete = makeAthlete({
    password: await bcrypt.hash('123456', 10)
  })

  await inMemoryAthleteRepository.create(athlete)

  await expect(
    new LoginAthleteUseCase(inMemoryAthleteRepository).execute({
      email: athlete.email.value,
      password: '123456'
    })
  ).resolves.toBe(athlete)
})

test('it should not login a athlete with invalid password', async () => {
  const athlete = makeAthlete({
    password: await bcrypt.hash('123456', 10)
  })

  await inMemoryAthleteRepository.create(athlete)

  await expect(
    new LoginAthleteUseCase(inMemoryAthleteRepository).execute({
      email: athlete.email.value,
      password: '1234567'
    })
  ).rejects.toThrowError()
})

test('it should not login a non-existent athlete', async () => {
  await expect(
    new LoginAthleteUseCase(inMemoryAthleteRepository).execute({
      email: 'tetetet@gmail.com',
      password: '1234567'
    })
  ).rejects.toThrowError()
})
