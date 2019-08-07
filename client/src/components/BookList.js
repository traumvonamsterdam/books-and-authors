import React, { useEffect } from "react";
import { useStateValue } from "../state/StateProvider";
import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { getBooksQuery } from "../graphql/queries";
import { deleteBookMutation } from "../graphql/mutations";
import "./BookList.css";

const BookList = () => {
  const [{ books }, dispatch] = useStateValue();

  const { loading, error, data } = useQuery(getBooksQuery);
  const [deleteBook] = useMutation(deleteBookMutation);

  useEffect(() => {
    if (!loading && !error && data) {
      dispatch({ type: "updateBooks", books: data.books });
    }
  }, [dispatch, loading, error, data]);

  const handleDeleteBook = async e => {
    const bookId = e.target.value;
    dispatch({ type: "deleteBook", bookId });
    await deleteBook({ variables: { bookId } });
  };

  const viewThisBook = e => {
    dispatch({ type: "viewBook", bookId: e.target.id });
  };

  const viewThisAuthor = e => {
    dispatch({ type: "viewAuthor", authorId: e.target.id });
  };

  const showBooks = books =>
    books.map(book => (
      <div className="book-item" key={book._id}>
        <Link onMouseDown={viewThisBook} to="/book" id={book._id}>
          {book.title}
        </Link>
        <Link onMouseDown={viewThisAuthor} to="/author" id={book.author._id}>
          {book.author.name}
        </Link>
        <button onClick={handleDeleteBook} value={book._id} className="btn">
          Delete
        </button>
      </div>
    ));

  return (
    <div className="book-container">
      <h3>Available Books</h3>
      {loading && <div>Loading books...</div>}
      {error && <div>Cannot load books...</div>}
      {!loading && !error && books && showBooks(books)}
    </div>
  );
};

export default BookList;
