import React from "react"
import { ApolloClient, ApolloProvider, createHttpLink } from "@apollo/client"
import { cache } from "./cache"
import typeDefs from "./typeDefs"
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: '/graphql-api/'
})
const authLink = setContext((_, { headers }) => {
  const auth = JSON.parse(localStorage.getItem('auth') || '')
  return {
    headers: {
      ...headers,
      authorization: auth?.access_token ? `JWT ${auth.access_token}` : ""
    }
  }
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs
})

export function GrapQLProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default client
