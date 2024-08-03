import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Athlete, AthleteProps } from '@/domain/athlete/entity/athlete'
import { Email } from '@/domain/athlete/value-object/email'
import { Address } from '@/domain/athlete/value-object/address'
import { Phone } from '@/domain/athlete/value-object/phone'

export function makeAthlete(override: Partial<AthleteProps> = {}, id?: UniqueEntityID) {
  const athlete = Athlete.create(
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

  return athlete
}
