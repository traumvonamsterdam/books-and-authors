import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { typeDefs, resolvers } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(`listening on port 4000${server.graphqlPath}`);
});
