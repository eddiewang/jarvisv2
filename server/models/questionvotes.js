export default (sequelize, DataTypes) => {
  const QuestionVotes = sequelize.define('questionvote', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vote: {
      type: DataTypes.STRING
    }
  })

  return QuestionVotes
}
