import React from "react";
import AddBookForm from "../components/AddBookForm";
import BookList from "../components/BookList";

import { StateProvider } from "../state/StateProvider";

import { Query, Mutation } from "react-apollo";
import { deleteBookMutation } from "../graphql/mutations";
import "./BookPage.css";

const BookPage = props => {
  const initialState = {
    books: [],
    authors: [],
    topMessage: { messageType: null, message: "" }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "updateBooks":
        return { ...state, books: action.books };
      case "updateAuthors":
        return { ...state, authors: action.authors };
      case "deleteBook":
        // const deleteBook = async bookId => {
        //   await props.deleteBook({ variables: { bookId } });
        // };
        // deleteBook(action.bookId);
        return {
          ...state,
          books: state.books.filter(book => book._id !== action.bookId)
        };
      case "updateMessage":
        return {
          ...state,
          topMessage: {
            messageType: action.messageType,
            message: action.message
          }
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider
      initialState={initialState}
      reducer={reducer}
      className="page"
    >
      <AddBookForm />
      <BookList />
    </StateProvider>
  );
};

export default () => (
  <Mutation mutation={deleteBookMutation}>
    {deleteBook => <BookPage deleteBook={deleteBook} />}
  </Mutation>
);
