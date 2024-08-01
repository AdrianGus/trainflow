import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { User } from '@/domain/user/entity/user'
import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'

export class FindOneUserByIdUseCase implements UseCaseInterface<string, User> {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findOneById(id)

    if (!user) throw new Error('User not found')

    return user
  }
}
