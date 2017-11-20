export default (sequelize, DataTypes) => {
  const Community = sequelize.define('community', {
    name: DataTypes.STRING,
    icon: {
      type: DataTypes.STRING,
      default: 'users'
    }
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
