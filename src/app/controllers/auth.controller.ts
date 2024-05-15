import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes } from 'http-status-codes'

import dataSource from '../../shared/configs/data-source.config'
import { profileRepository, userRepository } from '../repositories'
import { comparePassword } from '../utils/hash-password'
import { getAccessToken } from '../utils/jwt'
import {
  loginDtoValidator,
  registerDtoValidator,
} from '../validators/auth.validator'

export const authController = new Hono().basePath('/auth')

authController.post('/register', registerDtoValidator, async (c) => {
  const { email, password, name, age } = c.req.valid('json')
  const queryRunner = dataSource.createQueryRunner()
  await queryRunner.connect()
  try {
    await queryRunner.startTransaction()
    const user = await userRepository.registerUser(email, password)
    await profileRepository.createProfile(name, age, user)
    await queryRunner.commitTransaction()
    return c.json({ message: 'Register user success!' })
  } catch (err) {
    await queryRunner.rollbackTransaction()
    throw new HTTPException(StatusCodes.BAD_REQUEST, {
      message: err instanceof Error ? err.message : 'Some error happened',
    })
  }
})

authController.post('/login', loginDtoValidator, async (c) => {
  try {
    const { email, password } = c.req.valid('json')
    const user = await userRepository.findOne({
      where: { email },
      relations: { profile: true },
    })
    if (user && comparePassword(password, user.password)) {
      return c.json({
        accessToken: getAccessToken({
          id: user.id,
          email,
          name: user.profile.name,
        }),
      })
    } else {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: 'Email or password is incorrect!',
      })
    }
  } catch (err) {
    throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {
      message: err instanceof Error ? err.message : 'Some error happened',
    })
  }
})
