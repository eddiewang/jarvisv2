import requiresAuth from '../permissions'

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
    },
    answers: (parents, args, { models }) =>
      models.Answer.findAll({ where: { questionId: parents.dataValues.id } })
  },
  Query: {
    allQuestions: requiresAuth.createResolver(
      async (parents, { amount, skip }, { models }) =>
        models.Question.findAll({
          limit: amount,
          offset: skip
        })
    ),
    singleQuestion: requiresAuth.createResolver(
      async (parents, { id }, { models }) =>
        models.Question.findOne({ where: { id } })
    ),
    categoryQuestions: requiresAuth.createResolver(
      async (parents, { category, amount, skip }, { models }) =>
        models.Question.findAll({
          include: [
            {
              model: models.Member,
              where: { communityId: category }
            }
          ],
          limit: amount,
          offset: skip
        })
    )
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
