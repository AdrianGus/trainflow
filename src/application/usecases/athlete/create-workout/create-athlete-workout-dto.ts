import { CircuitStatusEnum } from '@/domain/athlete/enum/circuit-status-enum'
import { WorkoutStatusEnum } from '@/domain/athlete/enum/workout-status-enum'

export type CreateAthleteWorkoutInputDto = {
  athleteId: string
  title: string
  description: string
  circuits: Array<{
    title: string
    description: string
    exercises: Array<{
      title: string
      description: string
    }>
    status: CircuitStatusEnum
  }>
  status: WorkoutStatusEnum
}

export type CreateAthleteWorkoutOutputDto = {
  athleteId: string
  title: string
  description: string
  circuits: Array<{
    title: string
    description: string
    exercises: Array<{
      title: string
      description: string
    }>
    status: CircuitStatusEnum
  }>
  status: WorkoutStatusEnum
}
