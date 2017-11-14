import { tryLogin } from '../middleware/auth'

export default {
  Query: {
    allUsers: (parents, args, { models }) => models.User.findAll(),
    me: (parents, args, { models, user }) => {
      const u = models.User.findOne({ where: { id: user.id } })
      if (!u) {
        return {
          ok: false,
          user: null,
          errors: [{ path: 'login', message: 'Invalid find me' }]
        }
      }
      return {
        ok: true,
        user: u
      }
    }
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
        console.warn(err)
        return {
          ok: false
        }
      }
    }
  }
}
