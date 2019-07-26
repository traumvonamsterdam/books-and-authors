import React from "react";
import AddBookForm from "../components/AddBookForm";
import BookList from "../components/BookList";
import "./BookListPage.css";

const BookListPage = () => {
  return (
    <>
      <AddBookForm />
      <BookList />
    </>
  );
};

export default BookListPage;
