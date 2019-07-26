import React, { useEffect } from "react";
import { useStateValue } from "../state/StateProvider";
import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";

import { Query, Mutation } from "react-apollo";
import { getBooksQuery } from "../graphql/queries";
import { deleteBookMutation } from "../graphql/mutations";
import "./BookList.css";

const BookList = ({ deleteBook, getBooks }) => {
  const [{ books }, dispatch] = useStateValue();

  const { loading, error, data } = getBooks;

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
    console.log(e.target.key);
    dispatch({ type: "viewBook", bookId: e.target });
  };

  const showBooks = books =>
    books.map(book => (
      <div className="book-item" key={book._id}>
        <span onMouseDown={viewThisBook} key={book._id}>
          <Link to="/book">{book.title}</Link>
        </span>
        <div>{book.author.name}</div>
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

export default () => (
  <Query query={getBooksQuery}>
    {getBooks => (
      <Mutation mutation={deleteBookMutation}>
        {deleteBook => <BookList getBooks={getBooks} deleteBook={deleteBook} />}
      </Mutation>
    )}
  </Query>
);
