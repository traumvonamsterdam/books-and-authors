import React, { Component } from "react";
import { adopt } from "react-adopt";
import { Query, Mutation } from "react-apollo";
import { getBooksQuery } from "./queries";
import { addBookMutation } from "./mutations";

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      pages: 0,
      authorId: ""
    };
  }

  getBooks = ({ render }) => <Query query={getBooksQuery}>{render}</Query>;

  addBook = ({ render }) => (
    <Mutation mutation={addBookMutation}>{render}</Mutation>
  );

  mapper = {
    getBooks: this.getBooks,
    addBook: this.addBook
  };

  titleInput = () => (
    <div className="field">
      <label>Book title:</label>
      <input
        type="text"
        onChange={e => this.setState({ title: e.target.value })}
      />
    </div>
  );

  pagesInput = () => (
    <div className="field">
      <label>Pages:</label>
      <input
        type="number"
        onChange={e => this.setState({ pages: +e.target.value })}
      />
    </div>
  );

  authorSelect = ({ loading, error, data }) => {
    if (loading) {
      return <p>Loading authors...</p>;
    }
    if (error) {
      return <p>Cannot load authors</p>;
    }
    return (
      <div className="field">
        <label>Author:</label>
        <select onChange={e => this.setState({ authorId: e.target.value })}>
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

  handleSubmit = (addBook, e) => {
    e.preventDefault();
    const { title, pages, authorId } = this.state;
    addBook({ variables: { title, pages, authorId } });
  };

  render() {
    const AddBookForm = adopt(this.mapper);
    return (
      <AddBookForm>
        {({ getBooks: args, addBook }) => (
          <form onSubmit={this.handleSubmit.bind(this, addBook)}>
            {this.titleInput()}
            {this.pagesInput()}
            {this.authorSelect(args)}
            <button>Add Book</button>
          </form>
        )}
      </AddBookForm>
    );
  }
}

export default AddBook;
