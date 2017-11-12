export default {
  Answer: {
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
  }
}
