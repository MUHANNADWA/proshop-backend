import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";
import usersRoutes from "./routes/usersRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { USERS_URL } from "./constants.js";

dotenv.config();
connectDB();

const port = process.env.PORT;
const app = express();

app.use(cors({ credentials: true }));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use(USERS_URL, usersRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(notFound);
app.use(errorHandler);
app.listen(port, () =>
  console.log(`Backend server is running on port ${port}`)
);
