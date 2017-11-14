import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' })
const { localStorage } = window

const middlewareLink = setContext(req => {
  console.log('middleware')
  return {
    headers: {
      'x-token': localStorage.getItem('token'),
      'x-refresh-token': localStorage.getItem('refreshToken')
    }
  }
})

const afterwareLink = new ApolloLink((operation, forward) => {
  console.warn('afterware')
  return forward(operation).map(response => {
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
})

const httpLinkWithMiddleware = afterwareLink.concat(middlewareLink.concat(httpLink))

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
    console.log('HIHIHIHI')
    const { kind, operation } = getMainDefinition(query)
    console.log(kind, operation)
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
