export default {
  authors: async () => {
    let authors = await AuthorModel.find();

    authors = await authors.map(async author => {
      const books = await BookModel.find({ authorId: author._id });
      return { ...author._doc, books };
    });
    return authors;
  },
  author: (root, { name }) => {
    return AuthorModel.findOne({ name });
  }
};
