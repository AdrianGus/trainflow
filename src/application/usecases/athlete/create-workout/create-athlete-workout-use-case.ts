import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'
import { NotFoundError } from '@/infrastructure/http/util/api-errors'
import { Workout } from '@/domain/athlete/entity/workout'
import { WorkoutCircuitList } from '@/domain/athlete/entity/workouse-circuit-list'
import { Circuit } from '@/domain/athlete/entity/circuit'
import { CircuitExerciseList } from '@/domain/athlete/entity/circuit-exercise-list'
import { Exercise } from '@/domain/athlete/entity/exercise'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import {
  CreateAthleteWorkoutInputDto,
  CreateAthleteWorkoutOutputDto
} from './create-athlete-workout-dto'

export class AddAthleteWorkoutUseCase
  implements UseCaseInterface<CreateAthleteWorkoutInputDto, CreateAthleteWorkoutOutputDto>
{
  constructor(private readonly athleteRepository: AthleteRepositoryInterface) {}

  async execute(input: CreateAthleteWorkoutInputDto): Promise<CreateAthleteWorkoutOutputDto> {
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

    athlete.workouts.add(workout)

    await this.athleteRepository.update(athlete)

    return {
      athleteId: athlete.id.toString(),
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
