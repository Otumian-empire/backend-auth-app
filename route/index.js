const router = require("express").Router();

// profile view
router.get("/", (req, res) => {
  res.render("index");
});

// edit profile view
router.get("/", (req, res) => {
  res.send("Hello World!");
});

// signup view
router.post("/", (req, res) => {
  res.send("Hello World!");
});

// login view
router.post("/", (req, res) => {
  res.send("Hello World!");
});

// logout endpoint
router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
