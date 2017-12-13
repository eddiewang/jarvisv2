import { tryLogin } from '../middleware/auth'
import formatErrors from '../utils/formatErrors'
import requiresAuth from '../permissions'

const communities = [
  {
    name: 'design',
    icon: 'codepen'
  },
  {
    name: 'code',
    icon: 'server'
  },
  {
    name: 'people',
    icon: 'users'
  },
  {
    name: 'product',
    icon: 'target'
  }
]

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
        await Promise.all(
          communities.map(({ name }) => {
            return new Promise(async (resolve, reject) => {
              const community = await models.Community.findOne({
                where: { name }
              })
              await models.Member.create({
                communityId: community.id,
                userId: user.id,
                admin: true
              })
              if (!community) {
                reject(err)
              } else {
                resolve(true)
              }
            })
          })
        )
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
