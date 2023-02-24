// user routes
const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getloggedIsUserDetails,
  changePassword,
  updateuserDetails,
  managerAllUser,
  admingetOneUser,
  adminUpdateOneUserDetails,
  adminDeleteOneUser
} = require("../controller/userController");
const { isLoggedIn, customRole } = require("../middleware/userMiddleware");
const { route } = require("./home");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/userdashboard").get(isLoggedIn, getloggedIsUserDetails);
router.route("/password/update").post(isLoggedIn, changePassword);
router.route("/userdashboard/update").post(isLoggedIn, updateuserDetails);

// manager only route 
router.route("/manager/users").get(isLoggedIn,customRole('manager'), managerAllUser);

// admin only route
router.route("/admin/users").get(isLoggedIn,customRole('admin'), managerAllUser);
router.route("/admin/user/:id").get(isLoggedIn,customRole('admin'), admingetOneUser);
router.route("/admin/user/:id").put(isLoggedIn,customRole('admin'), adminUpdateOneUserDetails);
router.route("/admin/user/:id").delete(isLoggedIn,customRole('admin'), adminDeleteOneUser);
module.exports = router;
