export default {
  Question: {
    owner: async (parents, args, { models }) => {
      try {
        const { memberId } = parents.dataValues
        const member = await models.Member.findOne({ where: { id: memberId } })
        const user = await models.User.findOne({ where: { id: member.userId } })
        return user
      } catch (err) {
        console.warn(err)
        return {}
      }
    }
  },
  Query: {
    allQuestions: (parents, args, { models }) => models.Question.findAll()
  },
  Mutation: {
    createQuestion: async (parents, args, { models, user }) => {
      try {
        const question = await models.Question.create({ ...args })
        return {
          ok: true,
          question
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
