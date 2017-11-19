export default (sequelize, DataTypes) => {
  const Community = sequelize.define('community', {
    name: DataTypes.STRING
  })

  Community.associate = models => {
    Community.belongsToMany(models.User, {
      through: models.Member,
      foreignKey: {
        name: 'communityId'
      }
    })
  }

  return Community
}
