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

const getAuthorsQuery = gql`
  query Authors {
    authors {
      _id
      name
    }
  }
`;

export { getBooksQuery, getBooksAndAuthorsQuery, getAuthorsQuery };
