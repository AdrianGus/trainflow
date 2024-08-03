import { ValueObject } from '@/domain/shared/value-object'

type PhoneProps = {
  prefix: number
  number: number
}

export class Phone extends ValueObject<PhoneProps> {
  get prefix() {
    return this.props.prefix
  }

  get number() {
    return this.props.number
  }

  toString(): string {
    return `(${this.prefix}) ${this.number}`
  }

  static createFromString(phone: string): Phone {
    const [prefix, number] = phone.split(' ')

    if (!prefix || !number) throw new Error('Invalid phone string')

    return new Phone({
      prefix: Number(prefix.replace(/\D/g, '')),
      number: Number(number.replace(/\D/g, ''))
    })
  }
}
