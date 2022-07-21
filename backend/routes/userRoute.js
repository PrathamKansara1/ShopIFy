const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetail,
  logout,
  forgotpassword,
  resetPassword,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getOneUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const {
  authenticateUser,
  authenticateRole,
} = require("../middleware/authentication");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotpassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(authenticateUser, updatePassword);
router.route("/me").get(authenticateUser, getUserDetail);
router.route("/me/update").put(authenticateUser, updateUserProfile);
router
  .route("/admin/users")
  .get(authenticateUser, authenticateRole("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(authenticateUser, authenticateRole("admin"), getOneUser)
  .put(authenticateUser, authenticateRole("admin"), updateUserRole)
  .delete(authenticateUser, authenticateRole("admin"), deleteUser);

module.exports = router;
