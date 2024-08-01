import { beforeEach, expect, test } from 'vitest'
import { RegisterUserUseCase } from './register-user-use-case'
import { User } from '@/domain/user/entity/user'
import { InMemoryUserRepository } from '../../../../../test/repository/in-memory-user-repository'

let inMemoryUserRepository: InMemoryUserRepository

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository()
})

test('it should be able to register a new user', async () => {
  const user = await new RegisterUserUseCase(inMemoryUserRepository).execute({
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

  expect(inMemoryUserRepository.items.at(0)).toEqual(user)
  expect(user).toBeInstanceOf(User)
})

test('it should not be able to register a new user with an existent email', async () => {
  await new RegisterUserUseCase(inMemoryUserRepository).execute({
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
    new RegisterUserUseCase(inMemoryUserRepository).execute({
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
  ).rejects.toThrowError('User already exists')

  expect(inMemoryUserRepository.items).toHaveLength(1)
})
