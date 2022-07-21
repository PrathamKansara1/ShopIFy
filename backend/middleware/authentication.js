const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const tryCatch = require("./tryCatch");
const jwt = require("jsonwebtoken");

exports.authenticateUser = tryCatch(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login required to access this..", 401));
  }

  const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await userModel.findById(data.id);

  next();
});

exports.authenticateRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.body.role} Role is not allowed for this `)
      );
    }
    next();
  };
};
