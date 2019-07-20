import { AuthorModel } from "../models/author";
import { BookModel } from "../models/book";
import { transformAuthor, transformBook } from "./common";

export default {
  books: async () => {
    const books = await BookModel.find();
    return books.map(book => transformBook(book));
  },

  authors: async () => {
    const authors = await AuthorModel.find();
    return authors.map(author => transformAuthor(author));
  },

  book: async (root, { title }) => {
    const book = await BookModel({ title });
    return transformBook(book);
  }
};
