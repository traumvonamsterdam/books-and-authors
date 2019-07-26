import React from "react";
import { Query } from "react-apollo";
import { getBookQuery } from "../graphql/queries";

const BookView = ({ bookId }) => (
  <Query query={getBookQuery} variables={{ bookId }}>
    {bookQuery => {
      const { loading, error, data } = bookQuery;
      const { book } = data;

      return (
        <>
          {loading && <div>Loading book description...</div>}
          {error && <div>An error occurred.</div>}
          {!loading && !error && data && (
            <>
              <div>{book.title}</div>
              <div>Description goes here</div>
            </>
          )}
        </>
      );
    }}
  </Query>
);

export default BookView;
