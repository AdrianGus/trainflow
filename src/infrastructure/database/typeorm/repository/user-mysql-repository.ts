import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'
import { UserMapper } from '../mapper/user-mapper'
import { UserEntity } from '../entity/user-entity'
import { User } from '@/domain/user/entity/user'
import { PaginatedListRequest } from '@/domain/shared/repository/paginated-list-request'
import { PaginatedListResult } from '@/domain/shared/repository/paginated-list-result'
import { DataSource, Repository } from 'typeorm'

export class UserMysqlRepository implements UserRepositoryInterface {
  private repository: Repository<UserEntity>
  private mapper: UserMapper

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserEntity)
    this.mapper = new UserMapper()
  }

  async create(user: User): Promise<void> {
    const userEntity = this.mapper.toEntity(user)

    console.log(userEntity)

    await this.repository.save(userEntity)
  }

  async update(user: User): Promise<void> {
    const userEntity = this.mapper.toEntity(user)

    await this.repository.save(userEntity)
  }

  async delete(user: User): Promise<void> {
    const userEntity = this.mapper.toEntity(user)

    await this.repository.remove(userEntity)
  }

  async findOneById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOneBy({ id })

    return userEntity ? this.mapper.toDomain(userEntity) : null
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOneBy({ email })

    return userEntity ? this.mapper.toDomain(userEntity) : null
  }

  async findPaginatedList(paginator: PaginatedListRequest): Promise<PaginatedListResult<User>> {
    const page = paginator.getPage()

    const limit = paginator.getSize()

    const skip = (page - 1) * limit

    const [entities, total] = await this.repository.findAndCount({
      skip,
      take: limit
    })

    const users = entities.map(entity => this.mapper.toDomain(entity))

    return new PaginatedListResult(users, total)
  }
}
