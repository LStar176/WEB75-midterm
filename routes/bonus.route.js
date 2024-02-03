import express from "express";
import {
  getData,
  getDataById,
  postData,
  deleteDataById,
  updateDataById,
} from "../controller/bonus.controller.js";

const router = express.Router();

router.route("/").get(getData).post(postData);

router
  .route("/:id")
  .get(getDataById)
  .put(updateDataById)
  .delete(deleteDataById);

export { router as bonusRouter };
