const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProductDetails,
  getAdminProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReview,
  deleteProductReview,
} = require("../controller/productController");

const {
  authenticateRole,
  authenticateUser,
} = require("../middleware/authentication");

const router = express.Router();

router
  .route("/admin/product/new")
  .post(authenticateUser, authenticateRole("admin"), createProduct);

router.route("/products").get(getAllProducts);

router.route("/product/:id").get(getProductDetails);

router
  .route("/admin/products")
  .get(authenticateUser, authenticateRole("admin"), getAdminProducts);

router
  .route("/admin/product/:id")
  .put(authenticateUser, authenticateRole("admin"), updateProduct)
  .delete(authenticateUser, authenticateRole("admin"), deleteProduct);

router.route("/review").put(authenticateUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReview)
  .delete(authenticateUser, deleteProductReview);

module.exports = router;
