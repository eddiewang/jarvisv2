export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  })

  User.associate = models => {
    User.belongsToMany(models.Community, {
      through: models.Member,
      foreignKey: {
        name: "userId",
        field: "user_id"
      }
    })
    User.belongsToMany(models.Question, {
      through: "QuestionUpvote",
      foreignKey: {
        name: "userId",
        field: "user_id"
      }
    })
    User.belongsToMany(models.Question, {
      through: "QuestionDownvote",
      foreignKey: {
        name: "userId",
        field: "user_id"
      }
    })
  }

  return User
}
