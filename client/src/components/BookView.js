import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../graphql/queries";

const BookView = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { bookId }
  });

  return (
    <>
      {loading && <div>Loading book description...</div>}
      {!loading && !error && data && (
        <>
          <div>{data.book.title}</div>
          <div>Description goes here</div>
        </>
      )}
    </>
  );
};

export default BookView;
