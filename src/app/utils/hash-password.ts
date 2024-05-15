import { compareSync, hashSync } from 'bcryptjs'

const saltRounds = 10

export const hashPassword = (password: string): string => {
  return hashSync(password, saltRounds)
}

export const comparePassword = (
  password: string,
  dbPassword: string,
): boolean => {
  return compareSync(password, dbPassword)
}
