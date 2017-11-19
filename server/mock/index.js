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

const answers = {
  a1: {
    title: 'test answer',
    content: 'test content',
    questionId: 1,
    memberId: 1
  },
  a2: {
    title: 'test answer',
    content: 'test content',
    questionId: 2,
    memberId: 2
  },
  a3: {
    title: 'test answer',
    content: 'test content',
    questionId: 2,
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
          resolve(true)
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
          try {
            const community = await models.Community.create({ name })
            await models.Member.create({
              communityId: community.id,
              userId: 1,
              admin: true
            })
            resolve(true)
          } catch (err) {
            reject(err)
          }
        } else {
          resolve(true)
        }
      })
    })
  )
  console.log('QUESTION TIME')
  // Create questions
  await Promise.all(
    Object.keys(questions).map(q => {
      return new Promise(async (resolve, reject) => {
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
            resolve(true)
          } catch (err) {
            reject(err)
          }
        } else {
          resolve(true)
        }
      })
    })
  ).catch(err => {
    console.log('QUESTION ERR', err)
  })

  // Create answers
  await Promise.all(
    Object.keys(answers).forEach(a => {
      return new Promise(async (resolve, reject) => {
        const exists = await models.Answer.findOne({
          where: {
            memberId: answers[a].memberId
          }
        })

        if (!exists) {
          const { title, content, questionId, memberId } = answers[a]
          try {
            const answer = await models.Answer.create({ title, content })
            const member = await models.Member.findOne({
              where: { id: memberId }
            })
            const question = await models.Question.findOne({
              where: { id: questionId }
            })
            await answer.setQuestion(question)
            await answer.setMember(member)
            resolve(true)
          } catch (err) {
            console.log('Fatal error in answers', err)
            reject(err)
          }
        } else {
          resolve(true)
        }
      })
    })
  )
}
