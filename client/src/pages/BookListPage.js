import React from "react";
import AddBookForm from "../components/AddBookForm";
import BookList from "../components/BookList";

const BookListPage = () => {
  return (
    <>
      <AddBookForm />
      <BookList />
    </>
  );
};

export default BookListPage;
