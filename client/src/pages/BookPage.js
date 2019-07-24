import React from "react";
import AddBookForm from "../components/AddBookForm";
import BookList from "../components/BookList";

import { StateProvider } from "../state/StateProvider";

const BookPage = () => {
  const initialState = { books: [], authors: [] };

  const reducer = (state, action) => {
    switch (action.type) {
      case "updateBooks":
        return {
          ...state,
          books: action.books
        };
      case "updateAuthors":
        return {
          ...state,
          authors: action.authors
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AddBookForm />
      <BookList />
    </StateProvider>
  );
};

export default BookPage;
