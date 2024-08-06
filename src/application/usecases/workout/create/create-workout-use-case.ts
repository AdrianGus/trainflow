import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { NotFoundError } from '@/infrastructure/http/util/api-errors'
import { CreateWorkoutInputDto, CreateWorkoutOutputDto } from './create-workout-dto'
import { WorkoutRepositoryInterface } from '@/domain/workout/repository/workout-repository-interface'
import { Workout } from '@/domain/workout/entity/workout'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { WorkoutCircuitList } from '@/domain/workout/entity/workout-circuit-list'
import { Circuit } from '@/domain/workout/entity/circuit'
import { CircuitExerciseList } from '@/domain/workout/entity/circuit-exercise-list'
import { Exercise } from '@/domain/workout/entity/exercise'
import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'

export class CreateWorkoutUseCase
  implements UseCaseInterface<CreateWorkoutInputDto, CreateWorkoutOutputDto>
{
  constructor(
    private readonly athleteRepository: AthleteRepositoryInterface,
    private readonly workoutRepository: WorkoutRepositoryInterface
  ) {}

  async execute(input: CreateWorkoutInputDto): Promise<CreateWorkoutOutputDto> {
    const athlete = await this.athleteRepository.findOneById(input.athleteId)

    if (!athlete) throw new NotFoundError('Athlete not found')

    const workout = Workout.create({
      athleteId: new UniqueEntityID(input.athleteId),
      title: input.title,
      description: input.description,
      circuits: new WorkoutCircuitList(
        input.circuits.map(circuit =>
          Circuit.create({
            title: circuit.title,
            description: circuit.description,
            exercises: new CircuitExerciseList(
              circuit.exercises.map(exercise =>
                Exercise.create({
                  title: exercise.title,
                  description: exercise.description
                })
              )
            ),
            status: circuit.status
          })
        )
      ),
      status: input.status
    })

    await this.workoutRepository.create(workout)

    return {
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
