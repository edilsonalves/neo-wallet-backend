import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'

import { Account } from '@/modules/account/infrastructure/typeorm/entities/account'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  cpf: string

  @Column()
  @Exclude()
  password: string

  @OneToOne(() => Account, account => account.user)
  @JoinColumn()
  account: Account

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export { User }
