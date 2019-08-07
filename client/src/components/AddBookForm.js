import React, { useState, useEffect } from "react";
import { useStateValue } from "../state/StateProvider";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { getBooksQuery, getAuthorsQuery } from "../graphql/queries";
import { addBookMutation } from "../graphql/mutations";
import "./AddBookForm.css";

const AddBookForm = props => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState(0);
  const [authorId, setAuthorId] = useState("");

  const [{ authors, message }, dispatch] = useStateValue();

  const { loading, error, data } = useQuery(getAuthorsQuery)
  const { refetch: refetchBooks } = useQuery(getBooksQuery)
  const [addBook] = useMutation(addBookMutation)


  useEffect(() => {
    if (!loading && !error && data) {
      dispatch({ type: "updateAuthors", authors: data.authors });
    }
  }, [dispatch, loading, error, data]);

  const titleInput = () => (
    <div className="title">
      <label>Book title:</label>
      <input
        type="text"
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
    </div>
  );

  const pagesInput = () => (
    <div className="pages">
      <label>Pages:</label>
      <input
        type="number"
        onChange={e => setPages(+e.target.value)}
        value={pages}
      />
    </div>
  );

  const authorSelect = () => (
    <div className="field">
      <label>Author:</label>
      {loading && <div>Loading authors...</div>}
      {error && <div>Cannot load authors.</div>}
      {!loading && !error && authors && (
        <select
          onChange={e => {
            setAuthorId(e.target.value);
          }}
        >
          <option value="">Select author</option>
          {authors.map(author => (
            <option key={author._id} value={author._id}>
              {author.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );

  const handleSubmit = async e => {
    e.preventDefault();

    if (!title) {
      dispatch({
        type: "updateMessage",
        message: { type: "warning", text: "Please enter valid title!" }
      });
      return;
    }
    if (pages < 1) {
      dispatch({
        type: "updateMessage",
        message: { type: "warning", text: "Please enter valid number of pages" }
      });
      return;
    }
    if (!authorId) {
      dispatch({
        type: "updateMessage",
        message: { type: "warning", text: "Please select an author!" }
      });
      return;
    }

    await addBook({ variables: { title, pages, authorId } });
    const { data } = await refetchBooks();
    dispatch({ type: "updateBooks", books: data.books });

    setTitle("");
    setPages(0);
    dispatch({
      type: "updateMessage",
      message: { type: "success", text: "Book successfully added!" }
    });
  };

  return (
    <>
      <h3>Add new books here:</h3>
      <form onSubmit={handleSubmit} className="form">
        {titleInput()}
        {pagesInput()}
        {authorSelect()}
        <button>Add Book</button>
      </form>
    </>
  );
};

export default AddBookForm
