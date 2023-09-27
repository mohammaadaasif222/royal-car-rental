const Car = require("../models/carModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const APIFeatures = require("../utils/APIFeatures");
const cloudinary = require("cloudinary").v2;

// Create new car
exports.newCar = catchAsyncErrors(async (request, response) => {
console.log(request.body)
  try {
    let images = [];
    if (typeof request.body.images === "string") {
      images.push(request.body.images);
    } else {
      images = request.body.images;
    }

    const imagesLinks = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
          folder: "cars",
        });
        return {
          public_id: result.public_id,
          url: result.secure_url,
        };
      })
    );

    request.body.images = imagesLinks;
    const {
      name,
      price,
      description,
      vehicle_model,
      vehicle_number,
      seating_capacity,
      rentPerDay,     
    } = request.body;
    const car = await Car.create({
      name,
      price,
      description,
      vehicle_model,
      vehicle_number,
      images,
      seating_capacity,
      agency:request.agency._id, 
      rentPerDay,
    });

    response.status(201).json({
      success: true,
      car,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      error: "Error creating a new car",
    });
  }
});
// get all cars

exports.getAllcars = catchAsyncErrors(async (request, response, next) => {
  const resPerPage = 8;
  const countcar = await Car.countDocuments();
  const apiFeatures = new APIFeatures(Car.find(), request.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const cars = await apiFeatures.query;
  response.status(200).json({
    success: true,
    size: cars.length,
    resPerPage,
    countcar,
    cars,
  });
});



exports.getAgencyCars = catchAsyncErrors(async (request, response, next) => {
  try {
    const cars = await Car.find({ agency: request.agency._id });

    if (cars.length === 0) {
      return response.status(404).json({
        success: false,
        message: "No cars found for this agency",
      });
    }

    response.status(200).json({
      success: true,
      cars,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// get single car

exports.getSingleCar = catchAsyncErrors(async (request, response, next) => {
  try {
    const car = await Car.findOne({
      agency: request.agency._id,
      _id: request.params.id,
    });
  
    if (!car) {
      return next(new ErrorHandler("Car cannot found", 404));
    }
    response.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

});
exports.getCarDetails = catchAsyncErrors(async (request, response, next) => {
  try {
    const car = await Car.findById(request.params.id);
  
    if (!car) {
      return next(new ErrorHandler("Car cannot found", 404));
    }
    response.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

});

// Update car

exports.updateCar = catchAsyncErrors(async (request, response, next) => {

  try {
    const car = await Car.findOne({
      agency: request.agency._id,
      _id:request.params.id,
    });

    if (!car) {
      return response.status(404).json({
        success: false,
        message: "Car not found",
      });
    }
    car.set(request.body);
    await car.save();

    response.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Delete single car

exports.deleteCar = catchAsyncErrors(async (request, response, next) => {
  try {
    const car = await Car.findOne({
      agency: request.agency._id,
      _id: request.params.id,
    });

    if (!car) {
      return response.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    await car.remove();

    response.status(200).json({
      success: true,
      message: "Car deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
