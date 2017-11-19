export default (sequelize, DataTypes) => {
  const Question = sequelize.define('question', {
    content: DataTypes.STRING,
    title: DataTypes.STRING
  })

  Question.associate = models => {
    Question.belongsTo(models.Member)
    Question.belongsToMany(models.Member, {
      through: 'QuestionUpvote',
      foreignKey: {
        name: 'questionId'
      }
    })
    Question.belongsToMany(models.Member, {
      through: 'QuestionDownvote',
      foreignKey: {
        name: 'questionId'
      }
    })
  }

  return Question
}
