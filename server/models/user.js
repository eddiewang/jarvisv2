import bcrypt from 'bcrypt'

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      jobRole: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email'
          }
        }
      },
      verified: {
        type: DataTypes.BOOLEAN,
        default: true
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 50],
            msg: 'Password needs to be between 5 and 50 characters long'
          }
        }
      }
    },
    {
      hooks: {
        afterValidate: async user => {
          const hashedPassword = await bcrypt.hash(user.password, 12)
          user.password = hashedPassword
        }
      }
    }
  )

  User.associate = models => {
    User.belongsToMany(models.Community, {
      through: models.Member,
      foreignKey: {
        name: 'userId'
      }
    })

    User.belongsToMany(models.Question, {
      through: models.QuestionVotes,
      foreignKey: {
        name: 'userId'
      }
    })

    User.belongsToMany(models.Answer, {
      through: models.AnswerVotes,
      foreignKey: {
        name: 'userId'
      }
    })
  }

  return User
}
