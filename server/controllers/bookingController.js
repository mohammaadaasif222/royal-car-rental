const asyncHandler = require("express-async-handler");
const Booking = require("../models/booking");

const addBookingItem = asyncHandler(async (req, res) => {
 console.log(req.body)
  const {
    bookingItem,
    fromAddress,
    toAddress,
    paymentMethod,
    bookingPrice,
    taxPrice,
    totalPrice,
    pickDate,
    returnDate
  } = req.body;
  
  if (new Date(pickDate) < new Date(returnDate)) {

    res.status(400).json({ error: 'Pick date should be earlier than return date' });
  }
  if (!bookingItem) {
    res.status(400);
   throw new Error("No Booking Found");
  } else {

    try {
      const booking = await Booking.create({
        bookingItem,
        customer: req.user._id,
        fromAddress,
        toAddress,
        pickDate,
        returnDate,
        paymentMethod,
        bookingPrice,
        taxPrice,
        totalPrice,
      });
      console.log(booking);
      res.status(201).json(booking);
    } catch (error) {
      console.log(error);
    }
  
  }
});

const getOrderById = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (booking) {
      res.json(booking);
    } else {
      res.status(404);
      throw new Error("Booking Not Found");
    }
  });
  
  //paidendpoint
  const updateOrderToPaid = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      (booking.isPaid = true),
        (booking.paidAt = Date.now()),
        (booking.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        });
      const updateOrder = await booking.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Booking Not Found");
    }
  });
  
  const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Booking.find({ user: req.user._id });
    res.json(orders);
  });

  
module.exports = { addBookingItem, getOrderById, updateOrderToPaid, getMyOrders };