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
    migrations: {
      tableName: 'knex_migrations',
      directory: './api/db/migrations'
    },
    seeds: {
      directory: './api/db/seeds'
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
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './api/db/migrations'
    },
    seeds: {
      directory: './api/db/seeds'
    },
  }

};
