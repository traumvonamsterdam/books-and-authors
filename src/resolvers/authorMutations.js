import { AuthorModel } from "../models/author";
import { transformAuthor } from "./common";

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
      await author.save();
      return transformAuthor(author);
    } catch (err) {
      throw err;
    }
  },
  deleteAuthor: async (root, { name }) => {
    let author = await AuthorModel.findOne({ name });
    if (!author) {
      throw new Error("No author with given name.");
    }

    author = transformAuthor(author);
    await AuthorModel.deleteOne({ name });
    return author;
  },
  updateAuthor: async (root, { old_name, new_name }) => {
    const author = await AuthorModel.findOneAndUpdate(
      { name: old_name },
      { name: new_name },
      { useFindAndModify: false }
    );
    return transformAuthor(author);
  }
};
