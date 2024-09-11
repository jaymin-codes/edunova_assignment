import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    issuedDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    rent: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
