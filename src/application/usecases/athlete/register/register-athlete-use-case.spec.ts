import { beforeEach, expect, test } from 'vitest'
import { RegisterAthleteUseCase } from './register-athlete-use-case'
import { Athlete } from '@/domain/athlete/entity/athlete'
import { InMemoryAthleteRepository } from '../../../../../test/repository/in-memory-athlete-repository'

let inMemoryAthleteRepository: InMemoryAthleteRepository

beforeEach(() => {
  inMemoryAthleteRepository = new InMemoryAthleteRepository()
})

test('it should be able to register a new athlete', async () => {
  const athlete = await new RegisterAthleteUseCase(inMemoryAthleteRepository).execute({
    name: 'Adrian Gusberti',
    email: 'adrian01020304gusberti@gmail.com',
    password: '123456',
    phone: '51 991612923',
    address: {
      zipCode: '91555000',
      street: 'Estrada joão de olveira remião',
      number: 123,
      district: 'Bairro',
      city: 'Porto alegre',
      state: 'RS'
    }
  })

  expect(inMemoryAthleteRepository.items.at(0)).toEqual(athlete)
  expect(athlete).toBeInstanceOf(Athlete)
})

test('it should not be able to register a new athlete with an existent email', async () => {
  await new RegisterAthleteUseCase(inMemoryAthleteRepository).execute({
    name: 'Adrian Gusberti',
    email: 'adrian01020304gusberti@gmail.com',
    password: '123456',
    phone: '51 991612923',
    address: {
      zipCode: '91555000',
      street: 'Estrada joão de olveira remião',
      number: 123,
      district: 'Bairro',
      city: 'Porto alegre',
      state: 'RS'
    }
  })

  await expect(
    new RegisterAthleteUseCase(inMemoryAthleteRepository).execute({
      name: 'Adrian Gusberti',
      email: 'adrian01020304gusberti@gmail.com',
      password: '123456',
      phone: '51 991612923',
      address: {
        zipCode: '91555000',
        street: 'Estrada joão de olveira remião',
        number: 123,
        district: 'Bairro',
        city: 'Porto alegre',
        state: 'RS'
      }
    })
  ).rejects.toThrowError('Athlete already exists')

  expect(inMemoryAthleteRepository.items).toHaveLength(1)
})
