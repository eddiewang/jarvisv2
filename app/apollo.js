import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' })
const { localStorage } = window

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('token') || undefined,
      'x-refresh-token': localStorage.getItem('refreshToken') || undefined
    }
  })
  return forward(operation)
})

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const { response: { headers } } = operation.getContext()

    if (headers) {
      const token = headers.get('x-token')
      const refreshToken = headers.get('x-refresh-token')

      if (token) {
        localStorage.setItem('token', token)
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }
    }

    return response
  })
)

const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
)

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken')
    }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLinkWithMiddleware
)

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
})
// export default new ApolloClient({ link: httpLink, cache: new InMemoryCache() })
