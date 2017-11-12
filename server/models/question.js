export default (sequelize, DataTypes) => {
  const Question = sequelize.define("question", {
    content: DataTypes.STRING,
    title: DataTypes.STRING
  })

  Question.associate = models => {
    Question.belongsTo(models.Member, {
      foreignKey: {
        name: "memberId",
        field: "member_id"
      }
    })
    Question.belongsToMany(models.Member, {
      through: "QuestionUpvote",
      foreignKey: {
        name: "questionId",
        field: "question_id"
      }
    })
    Questions.belongsToMany(models.Member, {
      through: "QuestionDownvote",
      foreignKey: {
        name: "questionId",
        field: "question_id"
      }
    })
  }

  return Question
}
