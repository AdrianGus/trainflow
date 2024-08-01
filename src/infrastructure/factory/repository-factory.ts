import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'
import { InMemoryUserRepository } from '../../../test/repository/in-memory-user-repository'

export class RepositoryFactory {
  constructor() {}

  buildUser(): UserRepositoryInterface {
    return new InMemoryUserRepository()
  }
}
