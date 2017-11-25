import requiresAuth from '../permissions'
import formatErrors from '../utils/formatErrors'

export default {
  Answer: {
    user: async (parents, args, { models }) => {
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
    upvotes: (parents, args, { models }) =>
      models.AnswerVotes.count({ where: { answerId: parents.id, vote: 'u' } }),
    downvotes: (parents, args, { models }) =>
      models.AnswerVotes.count({ where: { answerId: parents.id, vote: 'd' } }),
    vote: async (parents, args, { models, user }) => {
      const v = await models.AnswerVotes.findOne({
        where: {
          answerId: parents.id,
          userId: user.id
        }
      })
      if (!v) return null
      return v.vote
    }
  },
  Query: {
    allAnswers: requiresAuth.createResolver(
      async (parents, { id }, { models }) => {
        let config
        if (id) {
          config = {
            where: {
              questionId: id
            }
          }
        }
        return await models.Answer.findAll(config)
      }
    )
  },
  Mutation: {
    createAnswer: requiresAuth.createResolver(
      async (
        parents,
        { title, content, questionId, communityId },
        { models, user }
      ) => {
        try {
          const response = models.sequelize.transaction(async () => {
            const member = await models.Member.findOne({
              where: { userId: user.id, communityId }
            })
            const answer = await models.Answer.create({
              title,
              content,
              memberId: member.id,
              questionId
            })
            await models.AnswerVotes.create({
              vote: 'u',
              userId: user.id,
              answerId: answer.id
            })
            return answer
          })
          return {
            ok: true,
            answer: response
          }
        } catch (err) {
          console.warn(err)
          return {
            ok: false
          }
        }
      }
    ),
    upvoteAnswer: requiresAuth.createResolver(
      async (parents, { id }, { models, user }) => {
        try {
          const voteExists = await models.AnswerVotes.findOne({
            where: { userId: user.id, answerId: id }
          })
          if (voteExists) {
            console.log(voteExists.vote)
            if (voteExists.dataValues.vote == 'u') {
              voteExists.destroy()
              const answer = await models.Answer.findOne({ where: { id } })
              return {
                ok: true,
                answer,
                vote: null
              }
            } else {
              voteExists.update({ vote: 'u' })
              const answer = await models.Answer.findOne({ where: { id } })
              return {
                ok: true,
                vote: voteExists,
                answer
              }
            }
          } else {
            const vote = {
              vote: 'u',
              userId: user.id,
              answerId: id
            }
            const createVote = await models.AnswerVotes.create(vote)
            const answer = await models.Answer.findOne({ where: { id } })
            return {
              ok: true,
              vote: createVote,
              answer
            }
          }
        } catch (err) {
          const answer = await models.Answer.findOne({ where: { id } })
          return {
            ok: false,
            answer,
            errors: formatErrors(err, models)
          }
        }
      }
    ),
    downvoteAnswer: requiresAuth.createResolver(
      async (parents, { id }, { models, user }) => {
        try {
          const voteExists = await models.AnswerVotes.findOne({
            where: { userId: user.id, answerId: id }
          })
          if (voteExists) {
            if (voteExists.dataValues.vote == 'd') {
              voteExists.destroy()
              const answer = await models.Answer.findOne({ where: { id } })
              return {
                ok: true,
                answer,
                vote: null
              }
            } else {
              voteExists.update({ vote: 'd' })
              const answer = await models.Answer.findOne({ where: { id } })
              return {
                ok: true,
                vote: voteExists,
                answer
              }
            }
          } else {
            const vote = {
              vote: 'd',
              userId: user.id,
              answerId: id
            }
            const createVote = await models.AnswerVotes.create(vote)
            const answer = await models.Answer.findOne({ where: { id } })
            return {
              ok: true,
              vote: createVote,
              answer
            }
          }
        } catch (err) {
          const answer = await models.Answer.findOne({ where: { id } })
          return {
            ok: false,
            answer,
            errors: formatErrors(err, models)
          }
        }
      }
    )
  }
}
