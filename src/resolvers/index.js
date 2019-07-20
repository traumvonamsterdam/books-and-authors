import { AuthorModel } from "../models/author";
import { BookModel } from "../models/book";
import bookMutations from "./bookMutations";
import authorMutations from "./authorMutations";

const resolvers = {
  Query: {
    authors: () => {
      return AuthorModel.find();
    },
    author: (root, { name }) => {
      return AuthorModel.findOne({ name });
    },
    books: () => {
      return BookModel.find();
    },
    book: (root, { title }) => {
      return BookModel.findOne({ title });
    }
  },
  Mutation: {
    ...authorMutations,
    ...bookMutations
  }
};

export default resolvers;
