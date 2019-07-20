import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    authors {
      _id
      name
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

export { getBooksQuery, getAuthorsQuery };
