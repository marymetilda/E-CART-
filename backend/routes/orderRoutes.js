import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(authenticate, createOrder);

export default router;
