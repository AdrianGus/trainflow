import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string

  @Column({ type: 'varchar', length: 150 })
  name: string

  @Column({ type: 'varchar', length: 150 })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'varchar', length: 36 })
  phone: string

  @Column({ type: 'varchar', length: 15 })
  addressZipCode: string

  @Column({ type: 'varchar', length: 150 })
  addressStreet: string

  @Column({ type: 'smallint' })
  addressNumber: number

  @Column({ type: 'varchar', length: 36 })
  addressDistrict: string

  @Column({ type: 'varchar', length: 36 })
  addressCity: string

  @Column({ type: 'varchar', length: 36 })
  addressState: string

  @Column({ type: 'varchar', length: 36, nullable: true })
  addressComplement?: string

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    addressZipCode: string,
    addressStreet: string,
    addressNumber: number,
    addressDistrict: string,
    addressCity: string,
    addressState: string,
    addressComplement?: string
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.phone = phone
    this.addressZipCode = addressZipCode
    this.addressStreet = addressStreet
    this.addressNumber = addressNumber
    this.addressDistrict = addressDistrict
    this.addressCity = addressCity
    this.addressState = addressState
    this.addressComplement = addressComplement
  }
}
