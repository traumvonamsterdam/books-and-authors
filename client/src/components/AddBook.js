import React, { Component } from "react";
import { Adopt } from "react-adopt";
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

  getBooks = ({ render }) => <Query query={getBooksQuery}>{render}</Query>;

  addBook = ({ render }) => (
    <Mutation mutation={addBookMutation}>{render}</Mutation>
  );

  mapper = {
    getBooks: this.getBooks,
    addBook: this.addBook
  };

  render() {
    return (
      <Adopt mapper={this.mapper}>
        {({ getBooks: args, addBook }) => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                const { title, pages, authorId } = this.state;
                addBook({ variables: { title, pages, authorId } });
              }}
            >
              <div className="field">
                <label>Book title:</label>
                <input
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Pages:</label>
                <input
                  type="number"
                  onChange={e => this.setState({ pages: +e.target.value })}
                />
              </div>
              {this.authorSelect(args)}
              <button>Add Book</button>
            </form>
          );
        }}
      </Adopt>
    );
  }
}

export default AddBook;
