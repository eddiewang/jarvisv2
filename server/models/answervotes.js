export default (sequelize, DataTypes) => {
  const AnswerVotes = sequelize.define('answervote', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vote: {
      type: DataTypes.CHAR
    }
  })

  return AnswerVotes
}
