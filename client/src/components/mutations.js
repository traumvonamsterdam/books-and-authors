import { gql } from "apollo-boost";

const addBookMutation = gql`
  mutation AddBook($title: String!, $pages: Int, $authorId: ID!) {
    addBook(title: $title, pages: $pages, authorId: $authorId) {
      title
      pages
      authorId
    }
  }
`;

const addAuthorMutation = gql`
  mutation {
    addAuthor {
      name
      age
    }
  }
`;

export { addBookMutation, addAuthorMutation };
