import { AuthorModel } from "../models/author";
import { BookModel } from "../models/book";

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

      const book = new BookModel({
        title,
        pages,
        authorId
      });

      console.log(author);

      author.books.push(book.title);
      await author.save();
      return book.save();
    } catch (err) {
      throw err;
    }
  },

  deleteBook: async (root, { bookId }) => {
    const book = await BookModel.findOne({ _id: bookId });
    const author = await AuthorModel.findOne({ _id: book.author._id });

    author.books = author.books.filter(book => book._id !== bookId);
    return BookModel.deleteOne({ _id: bookId });
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
