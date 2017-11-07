export default (sequelize, DataTypes) => {
  const Question = sequelize.define("question", {
    content: DataTypes.STRING,
    title: DataTypes.STRING
  })

  return Question
}
