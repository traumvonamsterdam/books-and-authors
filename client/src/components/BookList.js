import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import "./BookList.css";

class BookList extends Component {
  render() {
    return (
      <Query
        query={gql`
          {
            authors {
              _id
              name
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          console.log(data);
          return (
            <div className="BookList">
              List of books:
              <ul>
                {data.authors.map(author => (
                  <li key={author._id}>{author.name}</li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default BookList;
