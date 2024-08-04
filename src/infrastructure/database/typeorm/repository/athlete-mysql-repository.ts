import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'
import { AthleteMapper } from '../mapper/athlete-mapper'
import { AthleteEntity } from '../entity/athlete-entity'
import { Athlete } from '@/domain/athlete/entity/athlete'
import { PaginatedListRequest } from '@/domain/shared/repository/paginated-list-request'
import { PaginatedListResult } from '@/domain/shared/repository/paginated-list-result'
import { DataSource, Repository } from 'typeorm'

export class AthleteMysqlRepository implements AthleteRepositoryInterface {
  private repository: Repository<AthleteEntity>
  private mapper: AthleteMapper

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(AthleteEntity)
    this.mapper = new AthleteMapper()
  }

  async create(athlete: Athlete): Promise<void> {
    const athleteEntity = this.mapper.toEntity(athlete)

    console.log(athleteEntity)

    await this.repository.save(athleteEntity)
  }

  async update(athlete: Athlete): Promise<void> {
    const athleteEntity = this.mapper.toEntity(athlete)

    await this.repository.save(athleteEntity)
  }

  async delete(athlete: Athlete): Promise<void> {
    const athleteEntity = this.mapper.toEntity(athlete)

    await this.repository.remove(athleteEntity)
  }

  async findOneById(id: string): Promise<Athlete | null> {
    const athleteEntity = await this.repository.findOneBy({ id })

    return athleteEntity ? this.mapper.toDomain(athleteEntity) : null
  }

  async findOneByEmail(email: string): Promise<Athlete | null> {
    const athleteEntity = await this.repository.findOneBy({ email })

    return athleteEntity ? this.mapper.toDomain(athleteEntity) : null
  }

  async findPaginatedList(paginator: PaginatedListRequest): Promise<PaginatedListResult<Athlete>> {
    const page = paginator.getPage()

    const limit = paginator.getSize()

    const skip = (page - 1) * limit

    const [entities, total] = await this.repository.findAndCount({
      skip,
      take: limit
    })

    const athletes = entities.map(entity => this.mapper.toDomain(entity))

    return new PaginatedListResult(athletes, total)
  }
}
