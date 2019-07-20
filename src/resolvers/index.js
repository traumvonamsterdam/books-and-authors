import queries from "./queries";
import bookMutations from "./bookMutations";
import authorMutations from "./authorMutations";

const resolvers = {
  Query: {
    ...queries
  },
  Mutation: {
    ...authorMutations,
    ...bookMutations
  }
};

export default resolvers;
