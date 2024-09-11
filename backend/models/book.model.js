import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true, 
    },
    category: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean
    }
  },
  { timestamps: true }
);

export const Book = mongoose.model("Books", bookSchema);