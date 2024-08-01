import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { CreateUserInputDto } from './create-user-dto'
import { User } from '@/domain/user/entity/user'
import { Email } from '@/domain/user/value-object/email'
import { Phone } from '@/domain/user/value-object/phone'
import { Address } from '@/domain/user/value-object/address'
import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'

export class CreateUserUseCase implements UseCaseInterface<CreateUserInputDto, User> {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async execute(input: CreateUserInputDto): Promise<User> {
    if (await this.userRepository.findOneByEmail(input.email))
      throw new Error('User already exists')

    const user = User.create({
      name: input.name,
      email: Email.createFromString(input.email),
      password: input.password,
      phone: Phone.createFromString(input.phone),
      address: Address.create({
        zipCode: input.address.zipCode,
        street: input.address.street,
        number: input.address.number,
        district: input.address.district,
        city: input.address.city,
        state: input.address.state,
        complement: input.address.complement
      })
    })

    await this.userRepository.create(user)

    return user
  }
}
