import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Book } from "../models/book.model.js";

//
//
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();

  if (books.length === 0) {
    throw new ApiError(500, "Something went wrong while fetching books");
  }

  const list = new Set();
  books.forEach((b) => {
    list.add(b.name);
  });

  const finalRes = Array.from(list);
  console.log(finalRes);

  return res
    .status(200)
    .json(new ApiResponse(200, finalRes, "All books fetched successfully"));
});

//
//
const addBook = asyncHandler(async (req, res) => {
  const { name, category, rent } = req.body;

  if (!name.trim() || !category.trim()) {
    throw new ApiError(400, "All fields are required!!");
  }
  if (rent <= 0) {
    throw new ApiError(400, "Rent/day should be greater than 0");
  }

  const bookExists = await Book.findOne({
    name,
  });
  if (bookExists) {
    throw new ApiError(409, "Book is already added to elibrary");
  }

  const newBook = await Book.create({
    name,
    category,
    rent,
    status: true,
  });

  const addedBook = await Book.findById(newBook._id);

  if (!addedBook) {
    throw new ApiError(500, "Something went wrong while adding book");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, addedBook, "Book added successfully"));
});

//
//
const searchByBookName = asyncHandler(async (req, res) => {
  const { bookName } = req.body;
  if (!bookName?.trim()) {
    throw new ApiError(400, "Field is empty");
  }

  const regex = new RegExp(bookName.trim(), "i");
  const findBook = await Book.find({ name: regex });

  if (findBook.length === 0) {
    throw new ApiError(404, "No such book found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, findBook, "Books found successfully"));
});

//
//
const sortWithRentRange = asyncHandler(async (req, res) => {
  //rent is set between 0 - 50
  const { minRent = 0, maxRent = 50} = req.body;
  
  if (isNaN(minRent) || isNaN(maxRent)) {
    throw new ApiError(
      400,
      "minRent and maxRent must be numbers between 0 and 50"
    );
  }

  if (minRent > maxRent || minRent < 0 || maxRent > 50) {
    throw new ApiError(400, "Invalid ranges");
  }

  const books = await Book.find({
    rent: {
      $gte: minRent,
      $lte: maxRent,
    },
  });

  if (books.length === 0) {
    throw new ApiError(404, "No books in this rent range");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, books, "Books found successfully"));
});

//
//
const sortByAll = asyncHandler(async (req, res) => {
  const { name, category, minRent = 0, maxRent = 50 } = req.body;

  if (isNaN(minRent) || isNaN(maxRent)) {
    throw new ApiError(
      400,
      "minRent and maxRent must be numbers between 0 and 50"
    );
  }

  if (minRent > maxRent || minRent < 0 || maxRent > 50) {
    throw new ApiError(400, "Invalid range");
  }

  const finalQuery = {
    rent: {
      $gte: minRent,
      $lte: maxRent,
    },
  };

  if (name) {
    const regex = new RegExp(name.trim(), "i");
    finalQuery.name = regex;
  }
  if (category) {
    finalQuery.category = category;
  }

  const books = await Book.find(finalQuery);

  if (books.length === 0) {
    throw new ApiError(404, "No books found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, books, "Books found successfully"));
});

export { getAllBooks, addBook, searchByBookName, sortWithRentRange, sortByAll };
