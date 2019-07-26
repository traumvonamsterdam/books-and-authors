import React, { useEffect } from "react";

import { useStateValue } from "../state/StateProvider";

import { Query } from "react-apollo";
import { getBookQuery } from "../graphql/queries";

const BookPage = () => {
  const [{ bookId }, dispatch] = useStateValue();
  useEffect(() => {
    console.log(bookId);
  }, [bookId]);
  return (
    <>
      {bookId && (
        <Query query={getBookQuery} variables={{ bookId }}>
          {bookQuery => {
            const { loading, error, data } = bookQuery;
            const { book } = data;

            return (
              <>
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
      )}
    </>
  );
};

export default BookPage;
