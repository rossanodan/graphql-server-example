# An overview of GraphQL and Apollo Server

## GraphQL

GraphQL is a query language that gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time.

GraphQL APIs are organized in terms of types and fields, not endpoints.

### Types

There are root types, scalar types and custom types.

Root types are: `Query`, `Mutation`, `Subscription`.

> Subscriptions are long-lasting operations that can change their result over time. They can maintain an active connection to your GraphQL server (most commonly via WebSocket), enabling the server to push updates to the subscription's result.

Scalar types are: `Int`, `Float`, `String`, `Boolean` and `ID`

Custom types are defined by you, depending on what you need. For example:

```
type Book {
  title: String!
  author: String!
  read: Boolean
  genres: [Genre]!
}
type Genre {
  id: ID!
  name: String!
}
```

### Executing a query

Imagine the following to be your GraphQL schema:

```
type Book {
  id: ID!
  title: String!
  author: String
}
type Query {
  books: [Book]!
}
```
and this your data (coming from a database, for example):

```
books = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling"
  },
  {
    id: 2,
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling"
  }
]
```

The query to fetch all the books is the following:

```
query GetBooks {
  books {
    id
    title
    author
  }
}
```

The query above returns an object like this:

```
{
  data: {
    books: [
      {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling"
      },
      {
        id: 2,
        title: "Harry Potter and the Goblet of Fire",
        author: "J.K. Rowling"
      }
    ]
  }
}
```

Let's make things more interesting by changing the schema.

```
type Book {
  id: ID!
  title: String!
  author: Author
}
type Author {
  name: String
}
type Query {
  books: [Book]!
}
```

Now, the query to fetch all the books with the authors is:

```
query GetBooks {
  books {
    id
    title
    author {
      name
    }
  }
}
```

### Executing a mutation

Mutations are used to "change the data" in our source. For example, to add a new book to the library or to modify an the name of an author.

In the schema, a mutation is defined as follows:

```
type Book {
  id: ID!
  title: String!
  author: String
}
type InputBook {
  title: String!
  author: String
}
type Mutation {
  addBook(input: InputBook): Book
}
```

The mutation above is executed like this:

```
mutation AddBook {
  addBook({ title: "The Sandman", author: "Neil Gaiman" }) {
    id
    title
    author
  }
}
```

This mutation returns an object of type `Book`.

## Apollo Server

> Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.

You can use Apollo Server as:

- A gateway for a federated supergraph
- The GraphQL server for a subgraph in a federated supergraph
- A stand-alone GraphQL server, including in a serverless environment
- ***An add-on to your application's existing Node.js middleware (such as Express)***