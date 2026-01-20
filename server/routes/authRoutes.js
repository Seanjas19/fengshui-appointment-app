const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/sign-up", authController.register);

router.post("/login", authController.login);

module.exports = router;