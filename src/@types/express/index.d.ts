import { Athlete } from '@/domain/athlete/entity/athlete'

declare global {
  namespace Express {
    export interface Request {
      athlete: {
        id: string
      }
    }
  }
}
