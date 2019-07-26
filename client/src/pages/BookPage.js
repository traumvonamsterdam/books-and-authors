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

            // return "asdf";
            return (
              <>
                {!loading && !error && data && (
                  <>
                    <div>book.title</div>
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
