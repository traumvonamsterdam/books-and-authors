import mongoose from "mongoose";
import { AuthorModel } from "./models/author";

// const authors = [
//   {
//     name: "Abbie Fletcher",
//     age: 29,
//     books: ["Wonderlust", "Might of the Mind"]
//   },
//   {
//     name: "Olivia Wilson",
//     age: 33,
//     books: [
//       "Creative Development",
//       "Surviving in the Modern Corporate Environment"
//     ]
//   },
//   {
//     name: "Cathy Hammond",
//     age: 31,
//     books: ["Silent Cliff", "Dustin Echoes"]
//   }
// ];

const resolvers = {
  Query: {
    authors: () => {
      return AuthorModel.find();
    },
    author: (root, { name }) => {
      return AuthorModel.findOne({ name });
    }
  },
  Mutation: {
    addAuthor: (root, args) => {
      const { name, age, books } = args;
      const author = new AuthorModel({
        name,
        age,
        books
      });
      return author.save();
    },
    deleteAuthor: (root, args) => {
      return AuthorModel.deleteOne({ _id: args.id });
    },
    updateAuthor: (root, args) => {
      const { old_name, new_name } = args;
      return AuthorModel.findOneAndUpdate(
        { name: old_name },
        { name: new_name },
        { useFindAndModify: false }
      );
    }
  }
};

export default resolvers;
