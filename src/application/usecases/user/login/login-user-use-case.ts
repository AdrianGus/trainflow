import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { User } from '@/domain/user/entity/user'
import { LoginUserInputDto } from './login-user-dto'
import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'
import bcrypt from 'bcrypt'

export class LoginUserUseCase implements UseCaseInterface<LoginUserInputDto, User> {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async execute(input: LoginUserInputDto): Promise<User> {
    const user = await this.userRepository.findOneByEmail(input.email)

    if (!user) throw new Error('User not found')

    const passwordMatch = await bcrypt.compare(input.password, user.password)

    if (!passwordMatch) throw new Error('Invalid credentials')

    return user
  }
}
