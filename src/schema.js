import resolvers from "./resolvers";
import { importSchema } from "graphql-import";
const typeDefs = importSchema("./src/schema.graphql");

// Add mock data during early development stages
const mocks = {
  String: () => "Hey developers"
};

export { typeDefs, resolvers, mocks };
