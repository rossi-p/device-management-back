require('dotenv').config()

module.exports = {

  dev: {
    client: process.env.CLIENT_DEV,
    connection: {
      port: process.env.PORT_DEV,
      host: process.env.HOST_DEV,
      database: process.env.DB_DEV,
      user:     process.env.USER_DEV,
      password: process.env.PASSWORD_DEV
    }, 
    pool: {
      min: parseInt(process.env.POOL_MIN_DEV),
      max: parseInt(process.env.POOL_MAX_DEV)
    },
    migrations: {
      tableName: process.env.KNEX_TABLENAME,
      directory: process.env.MIGRATIONS_DIR
    },
    seeds: {
      directory: process.env.SEEDS_DIR
    },
  },

  prod: {
    client: process.env.CLIENT_PROD,
    connection: {
      port: process.env.PORT_PROD,
      host: process.env.HOST_PROD,
      database: process.env.DB_PROD,
      user:     process.env.USER_PROD,
      password: process.env.PASSWORD_PROD
    }, 
    pool: {
      min: parseInt(process.env.POOL_MIN_PROD),
      max: parseInt(process.env.POOL_MAX_PROD)
    },
    migrations: {
      tableName: process.env.KNEX_TABLENAME,
      directory: process.env.MIGRATIONS_DIR
    },
    seeds: {
      directory: process.env.SEEDS_DIR
    },
  }

}
