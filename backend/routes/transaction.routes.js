import { Router } from "express";
import {
  issueBook,
  issuedBookHistory,
  returnBook,
  sortByDateRange,
  totalRentOfBook,
  userIssuedBook,
} from "../controllers/transaction.controller.js";

const router = Router();

router.route("/issueBook").post(issueBook);
router.route("/returnBook").post(returnBook);
router.route("/issuedBookHistory").post(issuedBookHistory);
router.route("/totalRentOfBook").post(totalRentOfBook);
router.route("/userIssuedBook").post(userIssuedBook);
router.route("/sortByDateRange").post(sortByDateRange);

export default router;
