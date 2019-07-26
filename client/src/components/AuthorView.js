import React from "react";
import { Query } from "react-apollo";
import { getAuthorQuery } from "../graphql/queries";

const AuthorView = ({ authorId }) => (
  <Query query={getAuthorQuery} variables={{ authorId }}>
    {authorQuery => {
      const { loading, error, data } = authorQuery;
      const { author } = data;

      return (
        <>
          {loading && <div>Loading author description...</div>}
          {error && <div>An error occurred.</div>}
          {!loading && !error && data && (
            <>
              <div>{author.name}</div>
              <div>Description goes here</div>
            </>
          )}
        </>
      );
    }}
  </Query>
);

export default AuthorView;
