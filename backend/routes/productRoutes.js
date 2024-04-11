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
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .post(authenticate, authorizeAdmin, formidable(), addProduct)
  .get(fetchProducts);

router.route("/allproducts").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
