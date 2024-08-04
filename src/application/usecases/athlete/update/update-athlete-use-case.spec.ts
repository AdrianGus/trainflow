import { beforeEach, expect, test } from 'vitest'
import { makeAthlete } from '../../../../../test/factory/make-athlete'
import { InMemoryAthleteRepository } from '../../../../../test/repository/in-memory-athlete-repository'
import { UpdateAthleteUseCase } from './update-athlete-usecase'

let inMemoryAthleteRepository: InMemoryAthleteRepository

beforeEach(() => {
  inMemoryAthleteRepository = new InMemoryAthleteRepository()
})

test('it should update an existing athlete', async () => {
  const athlete = makeAthlete()

  await inMemoryAthleteRepository.create(athlete)

  expect(inMemoryAthleteRepository.items).toHaveLength(1)

  const updatedAthlete = await new UpdateAthleteUseCase(inMemoryAthleteRepository).execute({
    id: athlete.id.toString(),
    name: 'John Doe',
    phone: '51 991616166',
    address: {
      zipCode: '915151501',
      street: 'Rua teste',
      number: 1232131,
      district: 'Lomba',
      city: 'Poa',
      state: 'RS'
    }
  })

  expect(updatedAthlete).toStrictEqual(athlete)
})

test('it should not update a non-existent athlete', async () => {
  await expect(
    new UpdateAthleteUseCase(inMemoryAthleteRepository).execute({
      id: '21312312',
      name: 'John Doe',
      phone: '51 991616166',
      address: {
        zipCode: '915151501',
        street: 'Rua teste',
        number: 1232131,
        district: 'Lomba',
        city: 'Poa',
        state: 'RS'
      }
    })
  ).rejects.toThrowError()
})
