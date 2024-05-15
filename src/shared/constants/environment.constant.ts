export const environment = {
  env: process.env.NODE_ENV ?? 'local',
  port: +(process.env.APP_PORT ?? 0),
  database: {
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  },
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
    accessLife: process.env.ACCESS_TOKEN_LIFE ?? '1h',
  },
}
