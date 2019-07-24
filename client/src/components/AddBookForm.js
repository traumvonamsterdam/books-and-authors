import React, { useState, useEffect } from "react";
import { useStateValue } from "../state/StateProvider";

import { Mutation, Query } from "react-apollo";
import { getAuthorsQuery } from "../graphql/queries";
import { addBookMutation } from "../graphql/mutations";
import "./AddBookForm.css";

const AddBookForm = props => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState(0);
  const [authorId, setAuthorId] = useState("");
  const [message, setMessage] = useState("");

  const [{ authors }, dispatch] = useStateValue();

  const { loading, error, data } = props.getAuthors;

  useEffect(() => {
    dispatch({ type: "updateAuthors", authors: data.authors });
  }, [data]);

  const titleInput = () => (
    <div className="field">
      <main />
      <label>Book title:</label>
      <input
        type="text"
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
    </div>
  );

  const pagesInput = () => (
    <div className="field">
      <label>Pages:</label>
      <input
        type="number"
        onChange={e => setPages(+e.target.value)}
        value={pages}
      />
    </div>
  );

  const authorSelect = () => {
    return (
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
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!title) {
      setMessage("Please enter valid title!");
      return;
    }
    if (pages < 1) {
      setMessage("Please enter valid number of pages!");
      return;
    }
    if (!authorId) {
      setMessage("Please choose an author!");
      return;
    }

    await props.addBook({ variables: { title, pages, authorId } });
    const { data } = await props.getBooks.refetch();
    dispatch({ type: "updateBooks", books: data.books });

    setTitle("");
    setPages(0);
    setMessage("Book successfully added!");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {titleInput()}
        {pagesInput()}
        {authorSelect()}
        <button>Add Book</button>
        {message && <div>{message}</div>}
      </form>
    </>
  );
};

export default () => (
  <Query query={getAuthorsQuery}>
    {getAuthors => (
      <Mutation mutation={addBookMutation}>
        {addBook => <AddBookForm addBook={addBook} getAuthors={getAuthors} />}
      </Mutation>
    )}
  </Query>
);
