import { gql } from "apollo-server-express";
import resolvers from "./resolvers";

const typeDefs = gql`
  type Author {
    _id: ID!
    name: String!
    age: Int
    books: [String]
  }

  type Query {
    authors: [Author]
    author(name: String): Author
    resolved: String
  }

  type Mutation {
    addAuthor(name: String!, age: Int, books: [String]): Author
    deleteAuthor(id: ID!): Author
    updateAuthor(old_name: String!, new_name: String!): Author
  }
`;

const mocks = {
  String: () => "Hey developers"
};

export { typeDefs, resolvers, mocks };
