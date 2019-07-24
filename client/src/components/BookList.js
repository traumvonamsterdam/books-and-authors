import React, { useEffect } from "react";
import { useStateValue } from "../state/StateProvider";

import { Query } from "react-apollo";
import { getBooksQuery } from "../graphql/queries";
import "./BookList.css";

const BookList = ({ getBooks }) => {
  const [{ books }, dispatch] = useStateValue();

  const { loading, error, data } = getBooks;

  useEffect(() => {
    dispatch({ type: "updateBooks", books: data.books });
  }, [data]);

  useEffect(() => {
    dispatch({ type: "updateBooks", books });
  }, [books]);

  return (
    <>
      <h3>Available Books</h3>
      {loading && <div>Loading books...</div>}
      {error && <div>Cannot load books...</div>}
      {!loading && !error && books && (
        <ol className="BookList">
          {books.map(book => (
            <li key={book._id}>{`${book.title} - ${book.author.name}`}</li>
          ))}
        </ol>
      )}
    </>
  );
};

export default () => (
  <Query query={getBooksQuery}>
    {getBooks => <BookList getBooks={getBooks} />}
  </Query>
);
