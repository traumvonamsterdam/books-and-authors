import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import { typeDefs, resolvers } from "./src/schema";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {
  res.render("index", {
    title: "Homepage"
  });
});

app.use(cors());
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen(port);
