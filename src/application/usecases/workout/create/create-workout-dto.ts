import { CircuitStatusEnum } from '@/domain/workout/enum/circuit-status-enum'
import { WorkoutStatusEnum } from '@/domain/workout/enum/workout-status-enum'

export type CreateWorkoutInputDto = {
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

export type CreateWorkoutOutputDto = {
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
