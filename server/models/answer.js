export default (sequelize, DataTypes) => {
  const Answer = sequelize.define("answer", {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  })

  Answer.associate = models => {
    Answer.belongsTo(models.Member, {
      foreignKey: {
        name: "memberId",
        field: "member_id"
      }
    })
    Answer.belongsTo(models.Question, {
      foreignKey: {
        name: "questionId",
        field: "question_id"
      }
    })
    Answer.belongsToMany(models.Member, {
      through: "AnswerUpvote",
      foreignKey: {
        name: "answerId",
        field: "answer_id"
      }
    })
    Answer.belongsToMany(models.Member, {
      through: "AnswerDownvote",
      foreignKey: {
        name: "answerId",
        field: "answer_id"
      }
    })
  }

  return Answer
}
