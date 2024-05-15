import { ProfileRepository } from './profile.repository'
import { TodoRepository } from './todo.repository'
import { UserRepository } from './user.repository'

export const userRepository = new UserRepository()
export const todoRepository = new TodoRepository()
export const profileRepository = new ProfileRepository()
