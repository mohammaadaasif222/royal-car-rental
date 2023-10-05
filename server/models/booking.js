const mongoose = require("mongoose");

// Define the car booking schema
const carBookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookingItem: {
    name: {
      type: String,
      required: true, 
    },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    rent: {
      type: Number,
      required: true,
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
  },
  fromAddress: {
    type: String,
    required: true,
  },
  toAddress: {
    type: String,
    required: true,
  },
  pickDate:{
    type: Date,
    required: true,
  },
  returnDate:{
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    // required: true,
  },
  paymentResult: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    upload_status: {
      type: String,
    },
    email_address: {

      type: String,
    },
  },
  taxPrice: {
    type: Number,
    required: true,
    defualt: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Booking = mongoose.model("CarBooking", carBookingSchema);

module.exports = Booking;
