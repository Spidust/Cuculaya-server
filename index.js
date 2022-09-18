const express = require("express");
const app = express();

//constants
const PORT = process.env.PORT || 5000;
const ROUTER = require("./routes/index");

//library
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//connect
const connect = async () =>
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fi50fjo.mongodb.net/CuculayaDB?retryWrites=true&w=majority`,
    () => console.log("connected")
  );
connect();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookie parser
app.use(cookieParser());
//cors
app.use(
  cors({
    origin: "*",
    method: "*",
    credentials: true
  })
);

//Routing
ROUTER(app);

app.listen(PORT, () => console.log("app is running at port ", PORT));
