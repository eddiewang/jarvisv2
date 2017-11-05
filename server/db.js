const Sequelize = require('sequelize')

const dbConfig = {
  database: 'scotiabank',
  username: 'jarvis',
  password: 'scotiabank'
}
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: 'localhost',
    dialect: 'postgres'
  }
)

module.exports = sequelize
