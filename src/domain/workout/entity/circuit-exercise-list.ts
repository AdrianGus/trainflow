import { WatchedList } from '@/domain/shared/watched-list'
import { Exercise } from './exercise'

export class CircuitExerciseList extends WatchedList<Exercise> {
  compareItems(a: Exercise, b: Exercise): boolean {
    return a.id.equals(b.id)
  }
}
