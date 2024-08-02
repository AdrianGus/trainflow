import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'
import { FindOneUserByIdOutputDto } from './find-one-user-by-id-dto'

export class FindOneUserByIdUseCase implements UseCaseInterface<string, FindOneUserByIdOutputDto> {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(id: string): Promise<FindOneUserByIdOutputDto> {
    const user = await this.userRepository.findOneById(id)

    if (!user) throw new Error('User not found')

    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email.value,
      phone: user.phone.toString(),
      address: {
        zipCode: user.address.zipCode,
        street: user.address.street,
        number: user.address.number,
        district: user.address.district,
        city: user.address.city,
        state: user.address.state,
        complement: user.address.complement
      }
    }
  }
}
