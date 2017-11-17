const users = {
  admin: {
    firstName: 'Eddie',
    lastName: 'Wang',
    jobRole: 'Software Engineer',
    email: 'eddie@eddiewang.me',
    verified: true,
    password: 'asdfasdfasdf'
  },
  user: {
    firstName: 'Moody',
    lastName: 'Abdul',
    jobRole: 'Product Manager',
    email: 'moody@scotiabank.com',
    verified: false,
    password: 'asdfasdfasdf'
  }
}

export default models => {
  Object.keys(users).forEach(async u => {
    const exists = await models.User.findOne({
      where: { email: users[u].email }
    })
    if (!exists) {
      models.User.create(users[u])
    }
  })
}
