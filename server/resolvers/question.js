import requiresAuth from '../permissions'

export default {
  Question: {
    user: async (parents, args, { models }) => {
      try {
        const { memberId } = parents.dataValues
        const member = await models.Member.findOne({ where: { id: memberId } })
        const user = await models.User.findOne(
          { where: { id: member.userId } },
          { raw: true }
        )
        return user
      } catch (err) {
        console.warn(err)
        return {}
      }
    },
    community: async (parents, args, { models }) => {
      try {
        const { memberId } = parents.dataValues
        const member = await models.Member.findOne({ where: { id: memberId } })
        const community = await models.Community.findOne(
          {
            where: { id: member.communityId }
          },
          { raw: true }
        )
        return community
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
      async (parents, { amount, skip, communityId }, { models }) => {
        let questions
        if (communityId) {
          questions = await models.Question.findAll(
            {
              limit: amount,
              offset: skip,
              include: [
                {
                  model: models.Member,
                  where: { communityId }
                }
              ]
            },
            {
              raw: true
            }
          )
        } else {
          questions = await models.Question.findAll(
            {
              limit: amount,
              offset: skip
            },
            {
              raw: true
            }
          )
        }

        if (questions.length > 0) {
          return {
            ok: true,
            questions,
            hasMore: true
          }
        } else {
          return {
            ok: true,
            questions,
            hasMore: false
          }
        }
      }
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
