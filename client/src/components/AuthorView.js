import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getAuthorQuery } from "../graphql/queries";

const AuthorView = ({ authorId }) => {
  const { loading, error, data } = useQuery(getAuthorQuery, {
    variables: { authorId }
  });

  return (
    <>
      {loading && <div>Loading author description...</div>}
      {error && <div>An error occurred.</div>}
      {!loading && !error && data && (
        <>
          <div>{data.author.name}</div>
          <div>Description goes here</div>
        </>
      )}
    </>
  );
};
export default AuthorView;
