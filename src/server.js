import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { typeDefs, resolvers, mocks } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(
  "mongodb+srv://jlfly12:wZSYV13*Fm@cluster0-1lwwv.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const app = express();
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(`listening on port 4000${server.graphqlPath}`);
});
