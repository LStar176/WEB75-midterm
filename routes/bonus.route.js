import express from "express";
import { authentication, author } from "../middleware/auth.middle.js";
import {
  getData,
  getDataById,
  postData,
  deleteDataById,
  updateDataById,
} from "../controller/bonus.controller.js";

const router = express.Router();

router.get("/", authentication, getData);

router.post("/", authentication, author, postData); // Authorization to post data

router
  .route("/:id")
  .all(authentication, author)
  .get(getDataById)
  .put(updateDataById)
  .delete(deleteDataById);

export { router as bonusRouter };
