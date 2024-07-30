import { expect, test } from 'vitest'
import { Email } from './email'

test('it should be able to create a new email from string', () => {
  const email = Email.createFromString('adrian.teste@gmail.com')

  expect(email.value).toBe('adrian.teste@gmail.com')
})

test('it should not be able to create a new email with an empty string', () => {
  expect(() => Email.createFromString('')).toThrowError()
})

test('it should not be able to create a invalid email', () => {
  expect(() => Email.createFromString('invalidemail.com.br')).toThrowError()
})
