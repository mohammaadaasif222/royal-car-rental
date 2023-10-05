const express = require("express");
const {
  addBookingItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controllers/bookingController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//getUserOrder
router.route("/myorders").get(protect, getMyOrders);
//get order by id
router.route("/:id").get(protect, getOrderById);
//craete new order
router.route("/").post(protect, addBookingItem);
//update order
router.route("/:id/pay").put(protect, updateOrderToPaid);
module.exports = router;
