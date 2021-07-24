import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export { Account }
