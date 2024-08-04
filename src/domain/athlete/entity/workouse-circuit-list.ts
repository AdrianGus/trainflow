import { WatchedList } from '@/domain/shared/watched-list'
import { Circuit } from './circuit'

export class WorkoutCircuitList extends WatchedList<Circuit> {
  compareItems(a: Circuit, b: Circuit): boolean {
    return a.id.equals(b.id)
  }
}
