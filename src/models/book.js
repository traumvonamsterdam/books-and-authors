import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Book = new Schema({
  title: { type: String, required: true },
  pages: Number,
  authorId: String
});

const BookModel = mongoose.model("Book", Book);

export { BookModel };
