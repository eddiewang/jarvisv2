export default (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  Member.associate = models => {
    Member.belongsToMany(models.Question, {
      through: 'QuestionUpvote',
      foreignKey: {
        name: 'memberId'
      }
    })
    Member.belongsToMany(models.Question, {
      through: 'QuestionDownvote',
      foreignKey: {
        name: 'memberId'
      }
    })
    Member.belongsToMany(models.Answer, {
      through: 'AnswerUpvote',
      foreignKey: {
        name: 'memberId'
      }
    })
    Member.belongsToMany(models.Answer, {
      through: 'AnswerDownvote',
      foreignKey: {
        name: 'memberId'
      }
    })
  }

  return Member
}
