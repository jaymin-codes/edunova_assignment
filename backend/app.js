import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true, limit: "3mb" }));

//routes import
import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.routes.js"
import transactionRouter from "./routes/transaction.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/transactions", transactionRouter);

export { app };