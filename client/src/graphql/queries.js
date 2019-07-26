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
const getBookQuery = gql`
  query Book($bookId: ID!) {
    book(bookId: $bookId) {
      _id
      pages
      title
      author {
        _id
        name
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

const getAuthorQuery = gql`
  query Author($authorId: ID!) {
    author(authorId: $authorId) {
      _id
      name
      age
      books {
        _id
        title
      }
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, getBookQuery, getAuthorQuery };
