import { RepositoryInterface } from '@/domain/shared/repository/repository-inteface'
import { User } from '../entity/user'

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  findOneByEmail(email: string): Promise<User | null>
}
