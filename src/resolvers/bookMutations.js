import { AuthorModel } from "../models/author";
import { BookModel } from "../models/book";
import { transformBook } from "./common";

export default {
  addBook: async (root, args) => {
    const { title, pages, authorId } = args;

    try {
      const author = await AuthorModel.findOne({ _id: authorId });
      if (!author) {
        throw new Error(
          "No author found. You may need to add the author first."
        );
      }

      let book = new BookModel({
        title,
        pages,
        authorId
      });

      author.books.push(book.title);
      await author.save();
      book = await book.save();
      return transformBook(book);
    } catch (err) {
      throw err;
    }
  },

  deleteBook: async (root, { bookId }) => {
    const book = await BookModel.findOne({ _id: bookId });
    const author = await AuthorModel.findOne({ _id: book.authorId });

    author.books = author.books.filter(book => book._id !== bookId);
    await BookModel.deleteOne({ _id: bookId });
    return transformBook(book);
  },

  updateBook: (root, args) => {
    const { old_title, new_title } = args;
    return BookModel.findOneAndUpdate(
      { title: old_title },
      { title: new_title },
      { useFindAndModify: false }
    );
  }
};
