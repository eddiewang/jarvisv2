export default (sequelize, DataTypes) => {
  const Answer = sequelize.define("answer", {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  })

  return Answer
}
