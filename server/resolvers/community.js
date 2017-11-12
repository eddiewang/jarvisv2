export default {
  Mutation: {
    addCommunityMember: async (parent, { email, communityId }, { models, user }) => {
      try {
        const memberPromise = models.Member.findOne(
          { where: { communityId, userId: user.id } },
          { raw: true }
        )
        const userToAddPromise = models.User.findOne({ where: { email } }, { raw: true })
        const [member, userToAdd] = await Promise.all([memberPromise, userToAddPromise])
        if (!member.admin) {
          return {
            ok: false,
            errors: [{ path: "email", message: "You cannot add members to the team" }]
          }
        }
        if (!userToAdd) {
          return {
            ok: false,
            errors: [{ path: "email", message: "Could not find user with this email" }]
          }
        }
        await models.Member.create({ userId: userToAdd.id, communityId })
        return {
          ok: true
        }
      } catch (err) {
        console.log(err)
        return {
          ok: false,
          errors: [{ path: "err", message: "error" }]
        }
      }
    },
    createCommunity: async (parent, args, { models, user }) => {
      try {
        const response = await models.sequelize.transaction(async () => {
          const community = await models.Community.create({ ...args })
          await models.Member.create({ communityId: community.id, userId: user.id, admin: true })
          return community
        })

        return {
          ok: true,
          community: response
        }
      } catch (err) {
        console.log(err)
        return {
          ok: false,
          errors: [{ path: "err", message: "error" }]
        }
      }
    }
  }
}
