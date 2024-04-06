import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);

export default router;
