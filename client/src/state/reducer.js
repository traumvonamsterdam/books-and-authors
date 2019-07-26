export default (state, action) => {
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
    case "viewBook":
      return {
        ...state,
        bookId: action.bookId
      };
    case "viewAuthor":
      return {
        ...state,
        authorId: action.authorId
      };
    case "updateMessage":
      return {
        ...state,
        message: {
          type: action.message.type,
          text: action.message.text
        }
      };
    default:
      return state;
  }
};
