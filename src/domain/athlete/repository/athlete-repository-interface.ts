import { RepositoryInterface } from '@/domain/shared/repository/repository-inteface'
import { Athlete } from '../entity/athlete'

export interface AthleteRepositoryInterface extends RepositoryInterface<Athlete> {
  findOneByEmail(email: string): Promise<Athlete | null>
}
