import { ValueObject } from '@/domain/shared/value-object'

type EmailProps = {
  email: string
}

export class Email extends ValueObject<EmailProps> {
  get value() {
    return this.props.email
  }

  static createFromString(email: string): Email {
    if (!email) throw new Error('Email cannot be an empty string')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) throw new Error('Invalid email format')

    return new Email({ email })
  }
}
