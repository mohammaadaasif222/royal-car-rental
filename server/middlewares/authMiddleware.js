const User = require("../models/userModel");
const Agency = require("../models/agencyModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./cathAsyncErrorsMiddleware");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

exports.isAuthenticatedUser = catchAsyncErrors(
  async (request, response, next) => {
    const { token } = request.cookies;

    if (!token) {
      return next(new ErrorHandler("Login first to access this resource!"));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    request.user = await User.findById(decode.id);

    next();
  }
);

exports.authorizeRoles = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.agency.role)) {
      return next(
        res
          .status(403)
          .json(
            `Role (${req.agency.role}) is not allowed to access this resource`
          )
      );
    }

    next();
  };
};
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized , Token failed");
    }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, not token");
  }
});
exports.checkAgency = asyncHandler(async (req, res, next) => {
 console.log(req.headers)
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.agency = await Agency.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized , Token failed");
    }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, not token");
  }
});
