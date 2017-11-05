const Sequelize = require('sequelize')
const conn = require('../db')

const Question = conn.define('question', {
  content: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  name: Sequelize.STRING,
  title: Sequelize.STRING
})

module.exports = Question
