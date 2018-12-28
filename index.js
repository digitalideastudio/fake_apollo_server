const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type BusinessContact {
    id: ID!
    name: String
  }

  type Query {
    fakeBusinessContact: BusinessContact,
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    ...require('./mocks/fakeBusinessContact'),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);

