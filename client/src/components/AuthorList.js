import React, { Component } from "react";
import { Query } from "react-apollo";

import { getAuthorsQuery } from "./queries";
import "./AuthorList.css";

class AuthorList extends Component {
  displayAuthors = ({ authors }) =>
    authors.map(author => <li key={author._id}>{author.name}</li>);

  render() {
    return (
      <Query query={getAuthorsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading authors...</p>;
          if (error) return <p>Cannot load authors</p>;

          return (
            <>
              List of Authors:
              <ul className="AuthorList">{this.displayAuthors(data)}</ul>
            </>
          );
        }}
      </Query>
    );
  }
}

export default AuthorList;
