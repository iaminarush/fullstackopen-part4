import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import config from "./utils/config.js";
import blogRouter from "./controllers/blogs.js";

mongoose.connect(config.MONGODB_URI);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

export default app;
