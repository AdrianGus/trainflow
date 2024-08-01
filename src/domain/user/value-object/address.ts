import { ValueObject } from '@/domain/shared/value-object'

type AddressProps = {
  zipCode: string
  street: string
  number: number
  district: string
  city: string
  state: string
  complement?: string
}

export class Address extends ValueObject<AddressProps> {
  static create(props: AddressProps): Address {
    return new Address(props)
  }

  get zipCode() {
    return this.props.zipCode
  }

  get street() {
    return this.props.street
  }

  get number() {
    return this.props.number
  }

  get district() {
    return this.props.district
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get complement() {
    return this.props.complement
  }
}
