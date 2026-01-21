const { body } = require("express-validator");

//Rule for Registering a new account
const registerValidator = [
    body("user_email")
        .trim()
        .isEmail().withMessage("Please provide a valid email address")
        .normalizeEmail(),

    body("username")
        .trim()
        .notEmpty().withMessage("Username cannot be empty")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),

    body("user_password")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"),

    body("user_contact")
        .trim()
        .notEmpty().withMessage("Contact number is required")
        .isNumeric().withMessage("Contact must be numeric")
        .isLength({ min: 10, max: 15 }).withMessage("Please provide valid contact number")
];

//Rule for Login 
const loginValidator = [
    body("user_email")
        .trim()
        .isEmail().withMessage("Please provide a valid email address")
        .normalizeEmail(),

    body("user_password")
        .notEmpty().withMessage("Password is required")
]

module.exports = {
    registerValidator,
    loginValidator
}