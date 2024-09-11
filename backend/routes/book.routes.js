import { Router } from "express";
import {
  addBook,
  getAllBooks,
  searchByBookName,
  sortByAll,
  sortWithRentRange,
} from "../controllers/book.controller.js";

const router = Router();

router.route("/getAllBooks").get(getAllBooks);
router.route("/addBook").post(addBook);
router.route("/searchByBookName").post(searchByBookName);
router.route("/sortWithRent").post(sortWithRentRange);
router.route("/sortByAll").post(sortByAll);

export default router;
