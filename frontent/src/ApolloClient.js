import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'


const httpLink = createHttpLink({
    // <<<<<<< HEAD
   // uri: 'http://localhost:5000'

    uri:'https://tiny-pear-indri-coat.cyclic.app' 
})


const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default client

