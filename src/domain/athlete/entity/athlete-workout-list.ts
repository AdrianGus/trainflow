import { WatchedList } from '@/domain/shared/watched-list'
import { Workout } from './workout'

export class AthleteWorkoutList extends WatchedList<Workout> {
  compareItems(a: Workout, b: Workout): boolean {
    return a.id.equals(b.id)
  }
}
