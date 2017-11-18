import { tryLogin } from '../middleware/auth'
import formatErrors from '../utils/formatErrors'
import requiresAuth from '../permissions'

export default {
  Query: {
    allUsers: (parents, args, { models }) => models.User.findAll(),
    me: requiresAuth.createResolver(async (parents, args, { models, user }) =>
      models.User.findOne({ where: { id: user.id } })
    )
  },
  Mutation: {
    login: (parents, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args)
        return {
          ok: true,
          user
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    }
  }
}
