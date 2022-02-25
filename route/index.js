const router = require("express").Router();

// profile view
router.get("/", (req, res) => {
  res.render("profile");
});

// edit profile view
router.get("/update/:id", (req, res) => {
  res.render("profile_update");
});

// edit password
router.get("/update/password/:id", (req, res) => {
  res.render("password_update");
});

// signup view
router.get("/signup", (req, res) => {
  res.render("signup");
});

// login view
router.get("/login", (req, res) => {
  res.render("login");
});

// logout endpoint
router.get("/logout", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
