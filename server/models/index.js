import Sequelize from 'sequelize'
const sequelize = new Sequelize('scotiabank', 'eddiewang', '', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op
})

const models = {
  User: sequelize.import('./user'),
  Member: sequelize.import('./member'),
  Answer: sequelize.import('./answer'),
  Question: sequelize.import('./question'),
  Community: sequelize.import('./community')
}

Object.keys(models).forEach(name => {
  if ('associate' in models[name]) {
    models[name].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
