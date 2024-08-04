import { EntityWithId } from '@/domain/shared/entity-with-id'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Email } from '../value-object/email'
import { Phone } from '../value-object/phone'
import { Address } from '../value-object/address'
import { AthleteWorkoutList } from './athlete-workout-list'
import { Optional } from '@/domain/shared/type/optional'

export type AthleteProps = {
  name: string
  email: Email
  password: string
  phone: Phone
  address: Address
  workouts: AthleteWorkoutList
}

export class Athlete extends EntityWithId<AthleteProps> {
  static create(props: Optional<AthleteProps, 'workouts'>, id?: UniqueEntityID): Athlete {
    return new Athlete(
      {
        workouts: props.workouts ?? new AthleteWorkoutList(),
        ...props
      },
      id
    )
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: Phone) {
    this.props.phone = phone
  }

  get address() {
    return this.props.address
  }

  set address(address: Address) {
    this.props.address = address
  }

  get workouts() {
    return this.props.workouts
  }

  clearWorkouts() {
    this.props.workouts = new AthleteWorkoutList()
  }
}
