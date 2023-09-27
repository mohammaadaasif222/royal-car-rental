const mongoose = require('mongoose');

// Define the car booking schema
const carBookingSchema = new mongoose.Schema({
  customerName: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Car",
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Agency",
  },
  carModel: {
    type: String,
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  }
});


const CarBooking = mongoose.model('CarBooking', carBookingSchema);

module.exports = CarBooking;
