import React, { useState, useEffect } from "react";
import { Query, Mutation } from "react-apollo";
import { getAuthorsQuery } from "../graphql/queries";
import { addBookMutation } from "../graphql/mutations";
import "./AddBookForm.css";

const AddBookForm = props => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState(0);
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAuthors();
  });

  const fetchAuthors = () => {
    const { loading, error, data } = props.getAuthors;
    if (!loading && !error) {
      setAuthors(data.authors);
    }
  };

  const titleInput = () => (
    <div className="field">
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
    const { loading, error } = props.getAuthors;
    if (loading) {
      return <div>Loading authors...</div>;
    }
    if (error) {
      return <div>Cannot load authors</div>;
    }

    return (
      <div className="field">
        <label>Author:</label>
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

    await props.addBook({
      variables: { title, pages, authorId }
    });

    props.updateBookList();
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

const WrappedForm = ({ updateBookList }) => (
  <Query query={getAuthorsQuery}>
    {getAuthors => (
      <Mutation mutation={addBookMutation}>
        {addBook => {
          const props = { getAuthors, addBook, updateBookList };
          return <AddBookForm {...props} />;
        }}
      </Mutation>
    )}
  </Query>
);
export default WrappedForm;
