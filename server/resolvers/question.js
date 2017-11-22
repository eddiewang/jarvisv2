import requiresAuth from '../permissions'
import formatErrors from '../utils/formatErrors'

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
      models.Answer.findAll({ where: { questionId: parents.dataValues.id } }),
    upvotes: (parents, args, { models }) =>
      models.QuestionVotes.count({
        where: { questionId: parents.id, vote: 'u' }
      }),
    downvotes: (parents, args, { models }) =>
      models.QuestionVotes.count({
        where: { questionId: parents.id, vote: 'd' }
      }),
    vote: async (parents, args, { models, user }) => {
      const v = await models.QuestionVotes.findOne({
        where: {
          questionId: parents.id,
          userId: user.id
        }
      })
      if (!v) return null
      return v.vote
    }
  },
  Query: {
    allQuestions: requiresAuth.createResolver(
      async (parents, { amount, skip = 0, communityId }, { models }) => {
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
    },
    // communityId -> memberId + questionId
    upvoteQuestion: requiresAuth.createResolver(
      async (parents, { id }, { models, user }) => {
        try {
          const voteExists = await models.QuestionVotes.findOne({
            where: { userId: user.id, questionId: id }
          })
          if (voteExists) {
            if (voteExists.dataValues.vote == 'u') {
              console.log('destroying')
              voteExists.destroy()
              const question = await models.Question.findOne({ where: { id } })
              return {
                ok: true,
                question,
                vote: null
              }
            } else {
              console.log('updating')
              voteExists.update({ vote: 'u' })
              const question = await models.Question.findOne({ where: { id } })
              return {
                ok: true,
                vote: voteExists,
                question
              }
            }
          } else {
            console.log('not exists', voteExists)
            const vote = {
              vote: 'u',
              userId: user.id,
              questionId: id
            }
            const createVote = await models.QuestionVotes.create(vote)
            const question = await models.Question.findOne({ where: { id } })
            return {
              ok: true,
              vote: createVote,
              question
            }
          }
        } catch (err) {
          const question = await models.Question.findOne({ where: { id } })
          return {
            ok: false,
            errors: formatErrors(err, models),
            question
          }
        }
      }
    ),
    downvoteQuestion: requiresAuth.createResolver(
      async (parents, { id }, { models, user }) => {
        try {
          const voteExists = await models.QuestionVotes.findOne({
            where: { userId: user.id, questionId: id }
          })
          if (voteExists) {
            if (voteExists.dataValues.vote == 'd') {
              voteExists.destroy()
              const question = await models.Question.findOne({ where: { id } })
              return {
                ok: true,
                vote: null,
                question
              }
            } else {
              voteExists.update({ vote: 'd' })
              const question = await models.Question.findOne({ where: { id } })
              return {
                ok: true,
                vote: voteExists,
                question
              }
            }
          } else {
            const vote = {
              vote: 'd',
              userId: user.id,
              questionId: id
            }
            const createVote = await models.QuestionVotes.create(vote)
            const question = await models.Question.findOne({ where: { id } })
            return {
              ok: true,
              vote: createVote,
              question
            }
          }
        } catch (err) {
          console.log('uhoh')
          return {
            ok: false,
            errors: formatErrors(err, models)
          }
        }
      }
    )
  }
}
