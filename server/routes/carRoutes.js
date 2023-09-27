const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
  checkAgency,
} = require("../middlewares/authMiddleware");
const {
  getAllcars,
  getAgencyCars,
  getSingleCar,
  newCar,
  deleteCar,
  updateCar,
  getCarDetails
} = require("../controllers/carController");

router.route("/cars").get(getAllcars);
router.route("/cars/:id").get(getCarDetails);
router.route("/agency/cars").get(checkAgency, getAgencyCars);
router.route("/agency/cars/new").post(checkAgency,authorizeRoles(1), newCar);
router.route("/agency/cars/:id").get(checkAgency, getSingleCar);
router
  .route("/agency/cars/:id")
  .put(checkAgency, authorizeRoles(1),updateCar)
  .delete(checkAgency,authorizeRoles(1), deleteCar);

module.exports = router;
