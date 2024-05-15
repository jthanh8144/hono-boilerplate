import { Repository } from 'typeorm'

import dataSource from '../../shared/configs/data-source.config'
import { User } from '../entities/user.entity'

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, dataSource.manager)
  }

  public async registerUser(email: string, password: string) {
    return await this.save(this.create({ email, password }))
  }
}
