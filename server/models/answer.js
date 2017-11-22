export default (sequelize, DataTypes) => {
  const Answer = sequelize.define('answer', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  })

  Answer.associate = models => {
    Answer.belongsTo(models.Member)
    Answer.belongsTo(models.Question)
    Answer.belongsToMany(models.User, {
      through: models.AnswerVotes,
      foreignKey: {
        name: 'answerId'
      }
    })
  }

  return Answer
}
