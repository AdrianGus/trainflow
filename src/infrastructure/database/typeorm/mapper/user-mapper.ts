import { Mapper } from '../shared/mapper'
import { User } from '@/domain/user/entity/user'
import { UserEntity } from '../entity/user-entity'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Address } from '@/domain/user/value-object/address'
import { Email } from '@/domain/user/value-object/email'
import { Phone } from '@/domain/user/value-object/phone'

export class UserMapper implements Mapper<User, UserEntity> {
  toEntity(domain: User): UserEntity {
    const address = domain.address
    return new UserEntity(
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

  toDomain(entity: UserEntity): User {
    const address = Address.create({
      zipCode: entity.addressZipCode,
      street: entity.addressStreet,
      number: entity.addressNumber,
      district: entity.addressDistrict,
      city: entity.addressCity,
      state: entity.addressState,
      complement: entity.addressComplement
    })

    return User.create(
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
