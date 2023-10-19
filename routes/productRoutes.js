import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  productController,createProductController, updateProductController, singleProductController, deleteProductController,
} from "../controllers/productController.js";

const router = express.Router();

//routes
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  updateProductController
);

//get All product
router.get("/get-product", productController);
//Single product
router.get("/single-product/:slug", singleProductController);

//delete product
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

export default router;
