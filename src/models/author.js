import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Author = new Schema({
  name: { type: String, required: true },
  age: Number,
  books: [String]
});

const AuthorModel = mongoose.model("Author", Author);

export { AuthorModel };
