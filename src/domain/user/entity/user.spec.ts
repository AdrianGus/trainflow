import { expect, test } from 'vitest'
import { User } from './user'
import { Email } from '../value-object/email'
import { Phone } from '../value-object/phone'
import { Address } from '../value-object/address'

test('it should be able to create a new user', () => {
  const user = User.create({
    name: 'John Doe',
    email: Email.createFromString('john@example.com'),
    password: '123',
    phone: Phone.createFromString('51 991612923'),
    address: Address.create({
      zipCode: '915550000',
      street: 'Rua teste',
      number: 123,
      district: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      complement: 'Complemento teste'
    })
  })

  expect(user).toBeInstanceOf(User)
})
