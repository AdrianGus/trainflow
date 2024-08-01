import { beforeEach, expect, test } from 'vitest'
import { InMemoryUserRepository } from '../../../../../test/repository/in-memory-user-repository'
import { makeUser } from '../../../../../test/factory/make-user'
import { LoginUserUseCase } from './login-user-use-case'
import bcrypt from 'bcrypt'

let inMemoryUserRepository: InMemoryUserRepository

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository()
})

test('it should login a existent user', async () => {
  const user = makeUser({
    password: await bcrypt.hash('123456', 10)
  })

  await inMemoryUserRepository.create(user)

  await expect(
    new LoginUserUseCase(inMemoryUserRepository).execute({
      email: user.email.value,
      password: '123456'
    })
  ).resolves.toBe(user)
})

test('it should not login a user with invalid password', async () => {
  const user = makeUser({
    password: await bcrypt.hash('123456', 10)
  })

  await inMemoryUserRepository.create(user)

  await expect(
    new LoginUserUseCase(inMemoryUserRepository).execute({
      email: user.email.value,
      password: '1234567'
    })
  ).rejects.toThrowError()
})

test('it should not login a non-existent user', async () => {
  await expect(
    new LoginUserUseCase(inMemoryUserRepository).execute({
      email: 'tetetet@gmail.com',
      password: '1234567'
    })
  ).rejects.toThrowError()
})
