import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { WorkoutRepositoryInterface } from '@/domain/workout/repository/workout-repository-interface'
import { NotFoundError } from '@/infrastructure/http/util/api-errors'
import { UpdateWorkoutInputDto, UpdateWorkoutOutputDto } from './update-workout-dto'

export class UpdateWorkoutUseCase
  implements UseCaseInterface<UpdateWorkoutInputDto, UpdateWorkoutOutputDto>
{
  constructor(private readonly workoutRepository: WorkoutRepositoryInterface) {}

  async execute(input: UpdateWorkoutInputDto): Promise<UpdateWorkoutOutputDto> {
    const workout = await this.workoutRepository.findOneById(input.id)

    if (!workout) throw new NotFoundError('Workout not found')

    if (input.title) workout.title = input.title

    if (input.description) workout.description = input.description

    if (input.status) workout.status = input.status

    return {
      id: workout.id.toString(),
      athleteId: workout.athleteId.toString(),
      title: workout.title,
      description: workout.description,
      circuits: workout.circuits.getItems().map(circuit => ({
        title: circuit.title,
        description: circuit.description,
        exercises: circuit.exercises.getItems().map(exercise => ({
          title: exercise.title,
          description: exercise.description
        })),
        status: circuit.status
      })),
      status: workout.status
    }
  }
}
