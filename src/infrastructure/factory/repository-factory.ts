import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'
import { UserMysqlRepository } from '../database/typeorm/repository/user-mysql-repository'
import { Database } from '../database/typeorm/database'

export class RepositoryFactory {
  constructor() {}

  buildUser(): UserRepositoryInterface {
    return new UserMysqlRepository(Database.getConnection())
  }
}
