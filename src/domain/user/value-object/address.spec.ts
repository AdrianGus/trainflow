import { expect, test } from 'vitest'
import { Address } from './address'

test('it should be able to create a new address without complement', () => {
  const address = Address.create({
    zipCode: '915550000',
    street: 'Rua teste',
    number: 123,
    district: 'Bairro teste',
    city: 'Cidade teste',
    state: 'Estado teste'
  })

  expect(address).toBeInstanceOf(Address)
})

test('it should be able to create a new address with complement', () => {
  const address = Address.create({
    zipCode: '915550000',
    street: 'Rua teste',
    number: 123,
    district: 'Bairro teste',
    city: 'Cidade teste',
    state: 'Estado teste',
    complement: 'Complemento teste'
  })

  expect(address).toBeInstanceOf(Address)
  expect(address.complement).toEqual('Complemento teste')
})
