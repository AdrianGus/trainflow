import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'
import { AthleteMysqlRepository } from '../database/typeorm/repository/athlete-mysql-repository'
import { Database } from '../database/typeorm/database'

export class RepositoryFactory {
  constructor() {}

  buildAthlete(): AthleteRepositoryInterface {
    return new AthleteMysqlRepository(Database.getConnection())
  }
}
