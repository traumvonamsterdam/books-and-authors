import React from "react";
import { Query } from "react-apollo";

import { getBooksAndAuthorsQuery } from "./queries";
import "./BookList.css";

const BookList = props => {
  const { loading, error, data } = props.getData;
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Cannot load books</div>;
  }

  return (
    <>
      <ul className="BookList">
        {data.books.map(book => (
          <li key={book._id}>{`${book.title} - ${book.author.name}`}</li>
        ))}
      </ul>
    </>
  );
};

const WrappedList = () => (
  <Query query={getBooksAndAuthorsQuery}>
    {getData => <BookList getData={getData} />}
  </Query>
);

export default WrappedList;
