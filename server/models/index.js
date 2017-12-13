import Sequelize from 'sequelize'

const isProd = process.env.NODE_ENV === 'production'

let sequelize
if (isProd) {
  const connectionString = process.env.DATABASE_URL

  cosnole.log('is prod', connectionString)
  sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op
  })
} else {
  sequelize = new Sequelize('scotiabank', 'eddiewang', '', {
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op
  })
}

const models = {
  User: sequelize.import('./user'),
  Member: sequelize.import('./member'),
  Answer: sequelize.import('./answer'),
  Question: sequelize.import('./question'),
  Community: sequelize.import('./community'),
  AnswerVotes: sequelize.import('./answervotes'),
  QuestionVotes: sequelize.import('./questionvotes')
}

Object.keys(models).forEach(name => {
  if ('associate' in models[name]) {
    models[name].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
