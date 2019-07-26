import { gql } from "apollo-boost";

const getBooksQuery = gql`
  query Books {
    books {
      _id
      title
      author {
        _id
        name
      }
    }
  }
`;

const getBooksAndAuthorsQuery = gql`
  query Books {
    books {
      _id
      title
      author {
        name
        _id
      }
    }
  }
`;

const getBookQuery = gql`
  query Book($bookId: ID!) {
    book(bookId: $bookId) {
      _id
      pages
      title
      author {
        name
        _id
      }
    }
  }
`;

const getAuthorsQuery = gql`
  query Authors {
    authors {
      _id
      name
    }
  }
`;

export {
  getBooksQuery,
  getBooksAndAuthorsQuery,
  getAuthorsQuery,
  getBookQuery
};
