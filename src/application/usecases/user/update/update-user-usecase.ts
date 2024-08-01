import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { User } from '@/domain/user/entity/user'
import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'
import { UpdateUserInputDto } from './update-user-dto'
import { Phone } from '@/domain/user/value-object/phone'
import { Address } from '@/domain/user/value-object/address'

export class UpdateUserUseCase implements UseCaseInterface<UpdateUserInputDto, User> {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(input: UpdateUserInputDto): Promise<User> {
    const user = await this.userRepository.findOneById(input.id)

    if (!user) throw new Error('User not found')

    if (input.name) user.name = input.name

    if (input.phone) user.phone = Phone.createFromString(input.phone)

    if (input.address)
      user.address = Address.create({
        zipCode: input.address.zipCode,
        street: input.address.street,
        number: input.address.number,
        district: input.address.district,
        city: input.address.city,
        state: input.address.state,
        complement: input.address.complement
      })

    await this.userRepository.update(user)

    return user
  }
}
