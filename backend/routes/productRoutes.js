import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
  addProduct,
  addProductReview,
  fetchAllProducts,
  fetchProductById,
  fetchProducts,
  removeProduct,
  updateProductDetails,
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(authenticate, authorizeAdmin, formidable(), addProduct)
  .get(fetchProducts);

router.route("/allproducts").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, addProductReview);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
