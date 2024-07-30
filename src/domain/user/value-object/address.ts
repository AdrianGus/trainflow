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

  get complement() {
    return this.props.complement
  }
}
