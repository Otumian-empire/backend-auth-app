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
router.get("/update/:id", protectRoute, profileUpdateController);

// edit password
router.get("/update/password/:id", protectRoute, updatePasswordController);

// signup view
router.get("/signup", isSessionAuthorized, (_req, res) => {
  return res.render("signup");
});

// login view
router.get("/login", isSessionAuthorized, (_req, res) => {
  return res.render("login");
});

// logout endpoint
router.get("/logout", logoutController);

module.exports = router;
