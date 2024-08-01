import { EntityWithId } from '@/domain/shared/entity-with-id'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Email } from '../value-object/email'
import { Phone } from '../value-object/phone'
import { Address } from '../value-object/address'

export type UserProps = {
  name: string
  email: Email
  password: string
  phone: Phone
  address: Address
}

export class User extends EntityWithId<UserProps> {
  static create(props: UserProps, id?: UniqueEntityID): User {
    return new User(props, id)
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: Phone) {
    this.props.phone = phone
  }

  get address() {
    return this.props.address
  }

  set address(address: Address) {
    this.props.address = address
  }
}
