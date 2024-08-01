import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { User, UserProps } from '@/domain/user/entity/user'
import { Email } from '@/domain/user/value-object/email'
import { Address } from '@/domain/user/value-object/address'
import { Phone } from '@/domain/user/value-object/phone'

export function makeUser(override: Partial<UserProps> = {}, id?: UniqueEntityID) {
  const user = User.create(
    {
      name: faker.name.fullName(),
      email: Email.createFromString(faker.internet.email()),
      password: faker.word.verb(),
      phone: Phone.createFromString(faker.phone.number('+48 91#######')),
      address: Address.create({
        zipCode: faker.address.zipCode(),
        street: faker.address.street(),
        number: parseInt(faker.address.buildingNumber()),
        district: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        complement: faker.address.zipCode()
      }),
      ...override
    },
    id
  )

  return user
}
