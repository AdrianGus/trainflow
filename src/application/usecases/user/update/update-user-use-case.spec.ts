import { beforeEach, expect, test } from 'vitest'
import { makeUser } from '../../../../../test/factory/make-user'
import { InMemoryUserRepository } from '../../../../../test/repository/in-memory-user-repository'
import { UpdateUserUseCase } from './update-user-usecase'

let inMemoryUserRepository: InMemoryUserRepository

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository()
})

test('it should update an existing user', async () => {
  const user = makeUser()

  await inMemoryUserRepository.create(user)

  expect(inMemoryUserRepository.items).toHaveLength(1)

  const updatedUser = await new UpdateUserUseCase(inMemoryUserRepository).execute({
    id: user.id.toString(),
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

  expect(updatedUser).toStrictEqual(user)
})

test('it should not update a non-existent user', async () => {
  await expect(
    new UpdateUserUseCase(inMemoryUserRepository).execute({
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
