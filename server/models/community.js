export default (sequelize, DataTypes) => {
  const Community = sequelize.define("community", {
    name: DataTypes.STRING
  })

  return Community
}
