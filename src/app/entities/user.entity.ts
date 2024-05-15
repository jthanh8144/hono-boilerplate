import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { hashPassword } from '../utils/hash-password'
import { Profile, Todo } from '.'

type ProfileEntity = Profile
type TodoEntity = Todo

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date

  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  profile: ProfileEntity

  @OneToMany(() => Todo, (todo) => todo.user, { onDelete: 'CASCADE' })
  todos: TodoEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  hashPass() {
    this.password = hashPassword(this.password)
  }
}
