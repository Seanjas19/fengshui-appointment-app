const { validationResult } = require("express-validator");

const validInfo = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map(err=> err.msg).join(", ");

        const error = new Error(errorMsg);
        error.statusCode = 400;
        return next(error);
    }

    next();
};

module.exports = validInfo;