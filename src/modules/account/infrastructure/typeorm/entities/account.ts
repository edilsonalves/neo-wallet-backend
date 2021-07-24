import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { User } from '@/modules/user/infrastructure/typeorm/entities/user'

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  agency: string

  @Column()
  number: string

  @Column()
  balance: string

  @Column()
  income: string

  @OneToOne(() => User, user => user.account)
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export { Account }
