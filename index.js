const { ApolloServer, gql } = require("apollo-server")
const {
  ApolloServerPluginLandingPageLocalDefault
} = require("apollo-server-core")

const books = [
  {
    title: "The Awakening",
    author: {
      name: "Kate Chopin"
    }
  },
  {
    title: "City of Glass",
    author: {
      name: "Paul Auster"
    }
  }
]

const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }
  type Author {
    name: String
  }
  type Query {
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => books
  },
  Author: {
    name: (parent, args, context, info) => `The author is ${parent.name}`
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
