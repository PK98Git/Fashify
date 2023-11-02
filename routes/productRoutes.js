import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  getProductController,
  createProductController,
  updateProductController,
  getSingleProductController,
  deleteProductController,
  productPhotoController,
  mytest,
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
router.get("/get-product", getProductController);
//Single product
router.get("/get-product/:slug", getSingleProductController);
//get photo
router.get("/product-photo/:pid",productPhotoController);

//mytest
// router.get("test-product",mytest)

//delete product
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

export default router;
