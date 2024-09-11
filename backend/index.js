// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/db.js";

dotenv.config({
  path: "../.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      try {
        app.on("error", (error) => {
          console.log("ERR: ", error);
          throw error;
        });
        console.log(`Server is running at port ${process.env.PORT}`);
      } catch (error) {
        console.log("MongoDB connection FAILED !!: ", error);
      }
    });
  })
  .catch((err) => {
    console.log("MongoDB connection FAILED !!", err);
  });

