import React from "react";
import { Query } from "react-apollo";

import { getBooksAndAuthorsQuery } from "../graphql/queries";
import "./BookList.css";

const BookList = ({ loading, error, data }) => {
  return (
    <>
      <h3>Available Books</h3>
      {loading && <div>Loading...</div>}
      {error && <div>Cannot load books</div>}
      {!loading && !error && (
        <ul className="BookList">
          {data.books.map(book => (
            <li key={book._id}>{`${book.title} - ${book.author.name}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

const WrappedList = () => (
  <Query query={getBooksAndAuthorsQuery}>
    {props => <BookList {...props} />}
  </Query>
);

export default WrappedList;
