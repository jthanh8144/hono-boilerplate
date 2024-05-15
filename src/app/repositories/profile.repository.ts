import { Repository } from 'typeorm'

import dataSource from '../../shared/configs/data-source.config'
import { Profile, type User } from '../entities'

export class ProfileRepository extends Repository<Profile> {
  constructor() {
    super(Profile, dataSource.manager)
  }

  public async createProfile(name: string, age: number, user: User) {
    return await this.save(this.create({ name, age, user }))
  }
}
