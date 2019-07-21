import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import { getAuthorsQuery } from "./queries";
import { addBookMutation } from "./mutations";

const AddBookForm = props => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState(0);
  const [authorId, setAuthorId] = useState("");

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
    const { loading, error, data } = props.getAuthors;
    if (loading) {
      return <div>Loading authors...</div>;
    }
    if (error) {
      return <div>Cannot load authors</div>;
    }
    return (
      <div className="field">
        <label>Author:</label>
        <select onChange={e => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {data.authors.map(author => (
            <option key={author._id} value={author._id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.addBook({ variables: { title, pages, authorId } });
    setTitle("");
    setPages(0);
    setAuthorId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {titleInput()}
      {pagesInput()}
      {authorSelect()}
      <button>Add Book</button>
    </form>
  );
};

const WrappedForm = () => (
  <Query query={getAuthorsQuery}>
    {getAuthors => (
      <Mutation mutation={addBookMutation}>
        {addBook => <AddBookForm getAuthors={getAuthors} addBook={addBook} />}
      </Mutation>
    )}
  </Query>
);
export default WrappedForm;
