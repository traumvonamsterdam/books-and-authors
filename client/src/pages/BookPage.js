import React from "react";

import { useStateValue } from "../state/StateProvider";

import BookView from "../components/BookView";
import { Redirect } from "react-router-dom";

const BookPage = () => {
  const [{ bookId }, dispatch] = useStateValue();

  const renderBook = bookId ? (
    <BookView bookId={bookId} />
  ) : (
    <Redirect to="/" />
  );

  return renderBook;
};

export default BookPage;
