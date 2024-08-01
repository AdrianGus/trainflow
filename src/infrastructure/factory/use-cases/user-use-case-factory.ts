import { RepositoryFactory } from '../repository-factory'
import { RegisterUserUseCase } from '@/application/usecases/user/register/register-user-use-case'
import { LoginUserUseCase } from '@/application/usecases/user/login/login-user-use-case'
import { FindOneUserByIdUseCase } from '@/application/usecases/user/find-one-by-id/find-one-user-by-id-use-case'

export class UserUseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  buildRegister() {
    return new RegisterUserUseCase(this.repositoryFactory.buildUser())
  }

  buildLogin() {
    return new LoginUserUseCase(this.repositoryFactory.buildUser())
  }

  buildFindOneById() {
    return new FindOneUserByIdUseCase(this.repositoryFactory.buildUser())
  }
}
