const router = require("express").Router();
const authController = require("../controllers/authController");
const validInfo = require("../middleware/validInfo.js");
const { registerValidator, loginValidator } = require("../utils/validators.js");

router.post("/sign-up", registerValidator, validInfo, authController.register);

router.post("/login", loginValidator, validInfo, authController.login);

module.exports = router;