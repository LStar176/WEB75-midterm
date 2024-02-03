import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { routerFacroty } from "./routes/routes.js";

const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() =>
  app.listen(process.env.PORT, () => {
    console.log("Server is connecting!");
  })
);

routerFacroty(app);
