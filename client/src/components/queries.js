import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      _id
      title
    }
  }
`;

const getBooksAndAuthorsQuery = gql`
  {
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
  {
    authors {
      _id
      name
    }
  }
`;

export { getBooksQuery, getBooksAndAuthorsQuery, getAuthorsQuery };
