const Agency = require("../models/agencyModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary').v2
//  Register new agency
exports.registerAgency = catchAsyncErrors(async (req, res, next) => {
   
  const result = await cloudinary.uploader.upload(req.body.picture,{
    folder:'profiles',
    width:150,
    crop:'scale'
  })
  
  const { agency_name, email, password } = req.body;
  
  try {
    const agency = await Agency.create({
      agency_name,
      email,
      password,
      picture:result.secure_url
    });
    sendToken(agency, 201, res);
  } catch (error) {
    res.status(401).json({
      success: false,
      error
    });
  }
});

// login agency

exports.loginAgency = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;
  console.log(request.body)
  if (!email || !password) {
    return response.status(400).json({
      success: false,
      message: "Please enter Email & Password !",
    });
    //  next(new ErrorHandler('Please enter Email & Password !', 400))
  }

  const agency = await Agency.findOne({ email }).select("+password");

  if (!agency) {
    return response.status(401).json({
      success: false,
      message: "Invalid Email & Password !",
    });
    // next(new ErrorHandler('Invalid Email & Password !', 401))
  }

  const isPasswordMacted = await agency.comparePassword(password);

  if (!isPasswordMacted) {
    return response.status(401).json({
      success: false,
      message: "Invalid Email & Password !",
    });
    //  next(new ErrorHandler('Invalid Email & Password !', 401))
  }

  sendToken(agency, 200, response);
});

//  Log Out Agency
exports.logoutAgency = catchAsyncErrors(async (request, response, next) => {
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  response.status(200).json({
    success: true,
    message: "Logout successfully !",
  });
});

exports.getAgencyProfile = asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.agency._id);
  if (agency) {
    res.json({
      _id: agency._id,
      name: agency.name,
      email: agency.email,
      role: agency.role,
    });
  } else {
    res.status(404);
    throw new Error("Agency Not Found");
  }
});

exports.updateAgencyProfile = asyncHandler(async (req, res) => {
  console.log(req.body)
  const agency = await Agency.findById(req.agency._id);
  if (agency) {
    agency.name = req.body.agency_name|| agency.agency_name;
    agency.email = req.body.email || agency.email;
    if (req.body.password) {
      agency.password = req.body.password;
    }
    const updateAgency = await agency.save();

    sendToken(updateAgency, 201, res);
  } else {
    res.status(404);
    throw new Error("agency Not Found!");
  }
});
