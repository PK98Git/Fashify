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
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,

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
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
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
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filter product
router.post('/product-filter', productFilterController)

//Product count
router.get('/product-count', productCountController)

//Product Per Page
router.get('/product-list/:page',productListController)

//serarch Product
router.get('/search/:keyword',searchProductController)

//similar product
router.get('/related-product/:pid/:cid',relatedProductController)

//category wise product
router.get('/product-category/:slug',productCategoryController)

//payments routes
//token 
router.get('/braintree/token',braintreeTokenController)


//payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
