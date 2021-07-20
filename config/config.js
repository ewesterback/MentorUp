require('dotenv').config()
module.exports = {
  development: {
    database: 'mentor_development',
    dialect: 'postgres'
  },
  test: {
    database: 'mentor_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
