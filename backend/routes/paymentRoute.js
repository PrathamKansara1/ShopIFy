const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/paymentController");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

router.route("/payment/process").post(authenticateUser, processPayment);

router.route("/stripeapikey").get(authenticateUser, sendStripeApiKey);

module.exports = router;
