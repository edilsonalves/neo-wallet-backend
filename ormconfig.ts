export default {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [process.env.ENTITES_PATH],
  migrations: [process.env.MIGRATIONS_PATH],
  cli: {
    migrationsDir: process.env.MIGRATIONS_ROOT
  }
}
