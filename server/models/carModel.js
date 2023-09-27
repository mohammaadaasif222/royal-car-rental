const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plase enter car name!"],
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "Plase enter car name!"],
    maxLength: 5,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  images: [
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
  vehicle_model: {
    type: String,
    required: [true, "Please enter vehicle model"],
  },
  vehicle_number: {
    type: String,
    required: [true, "Please enter vehicle number"],
  },
  seating_capacity: {
    type: Number,
    required: [true, "Please enter seating capacity"],
    maxLength: [10, "vehicle can not be exceed 10 searing capacity"],
  },
  rentPerDay: {
    type: String,
    default: 0,
  },
  agency:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Agency',
   required:true
  },
  createdAt: {  
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Car", carSchema);
