const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:3000", exposedHeaders: "auth-token" }));
app.use(express.json());
app.use(bodyParser.json());
//db connection --------------------------------------------------------------

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
app.use(express.urlencoded({ extended: false }));

connection.once("open", () => {
  console.log("database connetion established");
});
//routes------------------------------------------------------
const AuthRouter = require("./routes/authController");
const CarRouter = require("./routes/carsController");
const OrderRouter = require("./routes/orderController");
const UserRouter = require("./routes/userController");
app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/cars", CarRouter);
app.use("/orders", OrderRouter);

app.listen(port, () => {
  console.log("server listining on port :" + port);
});
