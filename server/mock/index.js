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

const questions = {
  q1: {
    title: 'How many vacation days can I take a year?',
    content: 'Loream ipsum',
    memberId: 1
  },
  q2: {
    title: 'This is another sample question',
    content: 'leam asn',
    memberId: 2
  },
  q3: {
    title: 'This is the third question',
    content: 'lean and stmo',
    memberId: 3
  }
}

const community = ['design', 'code', 'people', 'product']

export default async models => {
  // Create users
  await Promise.all(
    Object.keys(users).map(u => {
      return new Promise(async (resolve, reject) => {
        const exists = await models.User.findOne({
          where: { email: users[u].email }
        })
        if (!exists) {
          const user = resolve(await models.User.create(users[u]))
        } else {
          resolve(0)
        }
      })
    })
  )

  // Create communities and link admin user.
  await Promise.all(
    community.map(name => {
      return new Promise(async (resolve, reject) => {
        const exists = await models.Community.findOne({
          where: { name }
        })
        if (!exists) {
          const community = await models.Community.create({ name })
          resolve(
            await models.Member.create({
              communityId: community.id,
              userId: 1,
              admin: true
            })
          )
        } else {
          resolve(0)
        }
      })
    })
  )

  // Create questions
  Object.keys(questions).forEach(async q => {
    const exists = await models.Question.findOne({
      where: {
        memberId: questions[q].memberId
      }
    })

    if (!exists) {
      const { title, content, memberId } = questions[q]
      try {
        const question = await models.Question.create({
          title,
          content
        })
        const defaultMember = await models.Member.findOne({
          where: { id: memberId }
        })
        await question.setMember(defaultMember)
      } catch (err) {
        console.log('FATAL ERR CREATING ASSOCIATION', err)
      }
    }
  })
}
