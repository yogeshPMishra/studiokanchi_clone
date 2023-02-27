const User = require("../models/User");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");
exports.isLoggedIn = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return next(new CustomError("Login first to access this page", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userdetails = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(500).json({error : error});
  }
};

exports.customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userdetails.role)) {
      return next(new CustomError("You are not allowed for this resouce", 403));
    }
    next();
  };
};
