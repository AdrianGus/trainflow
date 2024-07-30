import { UniqueEntityID } from './unique-entity-id'

export abstract class EntityWithId<TProps> {
  private readonly _id: UniqueEntityID
  protected readonly props: TProps

  constructor(props: TProps, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  get id() {
    return this._id
  }
}
