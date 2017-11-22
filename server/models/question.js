export default (sequelize, DataTypes) => {
  const Question = sequelize.define('question', {
    content: DataTypes.STRING,
    title: DataTypes.STRING
  })

  Question.associate = models => {
    Question.belongsTo(models.Member)
    Question.belongsToMany(models.User, {
      through: models.QuestionVotes,
      foreignKey: {
        name: 'questionId'
      }
    })
  }

  return Question
}
