import { RepositoryInterface } from '@/domain/shared/repository/repository-inteface'
import { Workout } from '../entity/workout'

export interface WorkoutRepositoryInterface extends RepositoryInterface<Workout> {}
