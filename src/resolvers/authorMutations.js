import { AuthorModel } from "../models/author";
import { BookModel } from "../models/book";

export default {
  addAuthor: async (root, args) => {
    const { name, age } = args;

    try {
      const existingAuthor = await AuthorModel.findOne({
        name
      });
      if (existingAuthor) {
        throw new Error("User with the same name exists.");
      }
      const author = new AuthorModel({
        name,
        age,
        books: []
      });
      return author.save();
    } catch (err) {
      throw err;
    }
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
};
