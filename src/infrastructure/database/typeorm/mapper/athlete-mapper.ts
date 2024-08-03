import { Mapper } from '../shared/mapper'
import { Athlete } from '@/domain/athlete/entity/athlete'
import { AthleteEntity } from '../entity/athlete-entity'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Address } from '@/domain/athlete/value-object/address'
import { Email } from '@/domain/athlete/value-object/email'
import { Phone } from '@/domain/athlete/value-object/phone'

export class AthleteMapper implements Mapper<Athlete, AthleteEntity> {
  toEntity(domain: Athlete): AthleteEntity {
    const address = domain.address
    return new AthleteEntity(
      domain.id.toString(),
      domain.name,
      domain.email.value,
      domain.password,
      domain.phone.toString(),
      address.zipCode,
      address.street,
      address.number,
      address.district,
      address.city,
      address.state,
      address.complement
    )
  }

  toDomain(entity: AthleteEntity): Athlete {
    const address = Address.create({
      zipCode: entity.addressZipCode,
      street: entity.addressStreet,
      number: entity.addressNumber,
      district: entity.addressDistrict,
      city: entity.addressCity,
      state: entity.addressState,
      complement: entity.addressComplement
    })

    return Athlete.create(
      {
        name: entity.name,
        email: Email.createFromString(entity.email),
        password: entity.password,
        phone: Phone.createFromString(entity.phone),
        address: address
      },
      new UniqueEntityID(entity.id)
    )
  }
}
