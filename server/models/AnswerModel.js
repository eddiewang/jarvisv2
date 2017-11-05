const Sequelize = require('sequelize')
const conn = require('../db')

const Answer = conn.define('question', {
  content: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})

module.exports = Answer
