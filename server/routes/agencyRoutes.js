const experss = require("express");
const router = experss.Router();

const {  checkAgency } = require("../middlewares/authMiddleware");
const {
  registerAgency,
  loginAgency,
  logoutAgency,
  getAgencyProfile,
  updateAgencyProfile,
} = require("../controllers/agencyController");

router.route("/").post(registerAgency);
router.route("/login").post(loginAgency);
router.route("/logout").get(logoutAgency);
router.route("/profile").get(checkAgency, getAgencyProfile).put(checkAgency, updateAgencyProfile)


module.exports = router;
