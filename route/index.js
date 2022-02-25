const router = require("express").Router();

const { isSessionAuthorized, protectRoute } = require("./middleware");
const {
  profileController,
  profileUpdateController,
  updatePasswordController,
  logoutController,
} = require("./controller");

// profile view
router.get("/", protectRoute, profileController);

// edit profile view
router.get("/update", protectRoute, profileUpdateController);

// edit password
router.get("/update/password", protectRoute, updatePasswordController);

// signup view
router.get("/signup", isSessionAuthorized, (_req, res) => {
  return res.render("signup", { isActive: false });
});

// login view
router.get("/login", isSessionAuthorized, (_req, res) => {
  return res.render("login", { isActive: false });
});

// logout endpoint
router.get("/logout", logoutController);

module.exports = router;
