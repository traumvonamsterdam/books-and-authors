import React, { useState, useEffect } from "react";
import { Query } from "react-apollo";
import { getBooksQuery } from "../graphql/queries";
import AddBookForm from "./AddBookForm";
import "./AddBookForm.css";

const BookList = props => {
  const [books, setBooks] = useState([]);

  const updateBookList = async () => {
    const { data } = await props.getBooks.refetch();
    setBooks(data.books);
  };

  useEffect(() => {
    fetchBooks();
  });

  const fetchBooks = () => {
    const { loading, error, data } = props.getBooks;
    if (!loading && !error) {
      setBooks(data.books);
    }
  };

  const showAllBooks = () => {
    const { loading, error } = props.getBooks;
    if (loading) {
      return <div>Loading authors...</div>;
    }
    if (error) {
      return <div>Cannot load authors</div>;
    }
    return (
      <>
        <h3>Available Books</h3>
        <ol className="BookList">
          {books.map(book => (
            <li key={book._id}>{`${book.title} - ${book.author.name}`}</li>
          ))}
        </ol>
      </>
    );
  };

  return (
    <>
      <AddBookForm updateBookList={updateBookList} />
      {showAllBooks()}
    </>
  );
};

const WrappedList = () => (
  <Query query={getBooksQuery}>
    {getBooks => <BookList getBooks={getBooks} />}
  </Query>
);

export default WrappedList;
