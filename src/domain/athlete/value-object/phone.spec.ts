import { expect, test } from 'vitest'
import { Phone } from './phone'

test('it should be able to create a new phone from string', () => {
  const phone = Phone.createFromString('(51) 991612923')

  expect(phone.prefix).toBe(51)
  expect(phone.number).toBe(991612923)
})

test('it should not be able to create a new phone with an empty string', () => {
  expect(() => Phone.createFromString('')).toThrowError()
})

test('it should not be able to create a new phone with an invalid string', () => {
  expect(() => Phone.createFromString('invalid')).toThrowError()
})
