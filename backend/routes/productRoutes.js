import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

export default router;
