const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const agencySchema = new mongoose.Schema({
  agency_name: {
    type: String,
    required: [true, "Enter agency name !"],
    maxlenght: [30, "Name cannot be exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Enter agency email !"],
    unique: [true, "Please enter valid email address !"],
    validate: [validator.isEmail, "Please enter valid email address !"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password !"],
    minlength: [6, "Your password must be 6 character long !"],
    select: false,
  },
  picture: {
    type: String,
    default:""
  },
  role: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
});

// Encrypting password before saving
agencySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// comapre password
agencySchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

//  creating token
agencySchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};
module.exports = mongoose.model("Agency", agencySchema);
