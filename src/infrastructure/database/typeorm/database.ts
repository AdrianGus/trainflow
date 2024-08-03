import { DataSource } from 'typeorm'
import { AthleteEntity } from './entity/athlete-entity'

export class Database {
  private static connection: DataSource

  public async createConnection() {
    Database.connection = new DataSource({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [AthleteEntity],
      synchronize: true,
      logging: true
    })

    await Database.connection.initialize()
  }

  public static getConnection(): DataSource {
    return Database.connection
  }
}
