import { User } from '@/domain/user/entity/user'

declare global {
  namespace Express {
    export interface Request {
      user: User
    }
  }
}
