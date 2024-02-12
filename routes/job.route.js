import express from "express";
import { authentication, author } from "../middleware/auth.middle.js";
import {
  getData,
  getDataById,
  postData,
  deleteDataById,
  updateDataById,
} from "../controller/job.controller.js";

const router = express.Router();

router.get("/", authentication, getData);

router.post("/", authentication, author, postData); // Authorization to post data

router
  .route("/:id")
  .all(authentication, author) // Authorization
  .get(getDataById)
  .put(updateDataById)
  .delete(deleteDataById);

export { router as jobRouter };
