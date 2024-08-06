import { CircuitStatusEnum } from '@/domain/workout/enum/circuit-status-enum'
import { WorkoutStatusEnum } from '@/domain/workout/enum/workout-status-enum'

export type UpdateWorkoutInputDto = {
  id: string
  title?: string
  description?: string
  circuits?: Array<{
    title: string
    description: string
    exercises: Array<{
      title: string
      description: string
    }>
    status: CircuitStatusEnum
  }>
  status?: WorkoutStatusEnum
}

export type UpdateWorkoutOutputDto = {
  id: string
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
