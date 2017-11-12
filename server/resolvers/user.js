export default {
  Query: {
    allUsers: (parents, args, { models }) => models.User.findAll(),
    me: (parents, args, { models, user }) => models.User.findOne({ where: { id: user.id } })
  },
  Mutation: {
    login: (parents, { email, password }, { models }) => ({
      ok: true,
      token: "success",
      refreshToken: "123"
    }),
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args)

        return {
          ok: true,
          user
        }
      } catch (err) {
        console.log(err)
        return {
          ok: false
        }
      }
    }
  }
}
