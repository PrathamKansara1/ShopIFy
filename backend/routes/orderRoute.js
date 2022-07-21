const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const router = express.Router();

const {
  authenticateRole,
  authenticateUser,
} = require("../middleware/authentication");

router.route("/order/new").post(authenticateUser, newOrder);

router.route("/order/:id").get(authenticateUser, getSingleOrder);

router.route("/orders/me").get(authenticateUser, myOrders);

router
  .route("/admin/orders")
  .get(authenticateUser, authenticateRole("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(authenticateUser, authenticateRole("admin"), updateOrder)
  .delete(authenticateUser, authenticateRole("admin"), deleteOrder);

module.exports = router;
