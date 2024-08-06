import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { WorkoutRepositoryInterface } from '@/domain/workout/repository/workout-repository-interface'
import { NotFoundError } from '@/infrastructure/http/util/api-errors'

export class DeleteWorkoutUseCase implements UseCaseInterface<string, void> {
  constructor(private readonly workoutRepository: WorkoutRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const workout = await this.workoutRepository.findOneById(id)

    if (!workout) throw new NotFoundError('Workout not found')

    await this.workoutRepository.delete(workout)
  }
}
