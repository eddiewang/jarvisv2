const express = require('express')
const logger = require('./logger')
const argv = require('minimist')(process.argv.slice(2))
const setup = require('./middleware/frontendMiddleware')
const isDev = process.env.NODE_ENV !== 'production'
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
  ? require('ngrok')
  : false
const resolve = require('path').resolve
const bodyParser = require('body-parser')
const detect = require('detect-port')
const myApi = require('./api')
const app = express()
const prompt = require('./react-dev-utils/prompt')
const openBrowser = require('./react-dev-utils/openBrowser')
const chalk = require('chalk')
const path = require('path')
import { createServer } from 'http'
import mockData from './mock'

// GraphQl
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'
import { refreshTokens } from './middleware/auth'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import models from './models'
const SECRET = 'jarvisasiofddfhoi1hoi23jnl1kejd'
const SECRET2 = 'jarvisasiodffdhoi1hoi23jnl1kejasdjlkfasdd'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use(cors('*'))

export const addUser = async (req, res, next) => {
  const token = req.headers['x-token']
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET)
      req.user = user
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token']
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        SECRET,
        SECRET2
      )
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
        res.set('x-token', newTokens.token)
        res.set('x-refresh-token', newTokens.refreshToken)
      }
      req.user = newTokens.user
    }
  }
  next()
}

app.use(addUser)

const graphqlEndpoint = '/graphql'
app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      SECRET,
      SECRET2,
      user: req.user
    }
  }))
)

app.use(bodyParser.urlencoded({ extended: false }))
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: graphqlEndpoint,
    subscriptionsEndpoint: 'ws://localhost:3000/subscriptions'
  })
)
app.use('/api', myApi)

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'
const protocol = process.env.HTTPS === true ? 'https' : 'http'

const DEFAULT_PORT = argv.port || process.env.PORT || 3000
const isInteractive = process.stdout.isTTY

models.sequelize.sync({}).then(() => {
  mockData(models)
  detect(DEFAULT_PORT).then(port => {
    if (port === DEFAULT_PORT) {
      run(port)
      return
    }

    if (isInteractive) {
      const question = chalk.yellow(
        `Something is already running on port ${DEFAULT_PORT}. Change ports?`
      )

      prompt(question, true).then(shouldChangePort => {
        if (shouldChangePort) {
          run(port)
        }
      })
    } else {
      console.log(
        chalk.red(`Something is already running on port ${DEFAULT_PORT}`)
      )
    }
  })
})
// Start your app.

const server = createServer(app)
const run = port => {
  server.listen(
    port,
    host,
    err => {
      if (err) {
        return logger.error(err.message)
      }

      // Connect to ngrok in dev mode
      if (ngrok) {
        ngrok.connect(port, (innerErr, url) => {
          if (innerErr) {
            return logger.error(innerErr)
          }

          logger.appStarted(port, prettyHost, url)
        })
      } else {
        logger.appStarted(port, prettyHost)
      }
      // if (isDev) {
      //   openBrowser(protocol + '://' + prettyHost + ':' + port + '/')
      // }
    },
    () => {
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
          onConnect: async ({ token, refreshToken }, webSocket) => {
            if (token && refreshToken) {
              try {
                const { user } = jwt.verify(token, SECRET)
                return { models, user }
              } catch (err) {
                const newTokens = await refreshTokens(
                  token,
                  refreshToken,
                  models,
                  SECRET,
                  SECRET2
                )
                return { models, user: newTokens.user }
              }
            }

            return { models }
          }
        },
        {
          server,
          path: '/subscriptions'
        }
      )
    }
  )
}
