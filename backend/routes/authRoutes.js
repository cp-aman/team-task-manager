const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  signup,
  login,
} = require("../controllers/authController");

router.post("/signup", signup);

router.post("/login", login);

router.get(
  "/me",
  authMiddleware,
  (req, res) => {

    res.json({
      message: "Protected route accessed",
      user: req.user,
    });

  }
);

module.exports = router;