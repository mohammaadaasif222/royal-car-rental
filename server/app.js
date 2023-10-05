const experss = require("express");
const carRoutes = require("./routes/carRoutes");
const usersRoutes = require("./routes/authRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const filUpload = require("express-fileupload");
dotenv.config({ path: "./config/config.env" });

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errorMiddleware");

const app = experss();
app.use(experss.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(filUpload());

// cloudninary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors("origin", "*"));

app.get('/', (req, res) =>{
  res.send(200).json("hello world!");
})
// Routes
app.use("/", carRoutes);
app.use("/users", usersRoutes);
app.use("/booking", bookingRoutes);
app.use("/agency", agencyRoutes);

// Middle wares
app.use(errorMiddleware);

module.exports = app;
