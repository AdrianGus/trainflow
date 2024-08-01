import { RepositoryFactory } from './repository-factory'
import { UserUseCaseFactory } from './use-cases/user-use-case-factory'

export class UseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  buildUser() {
    return new UserUseCaseFactory(this.repositoryFactory)
  }
}
