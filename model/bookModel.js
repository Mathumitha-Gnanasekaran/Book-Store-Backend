import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  published_date: {
    type: Date,
    required: true,
  },

  isbn: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default mongoose.model("books", bookSchema);
