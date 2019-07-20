import { AuthorModel } from "../models/author";
import { BookModel } from "../models/book";

const findBooks = async authorId => {
  const books = await BookModel.find({ authorId: authorId });
  return books.map(book => transformBook(book));
};

const findAuthor = async authorId => {
  const author = await AuthorModel.findOne({ _id: authorId });
  return transformAuthor(author);
};

const transformBook = book => ({
  ...book._doc,
  author: findAuthor.bind(this, book.authorId)
});

const transformAuthor = author => ({
  ...author._doc,
  books: findBooks.bind(this, author._id)
});

export { transformAuthor, transformBook };
