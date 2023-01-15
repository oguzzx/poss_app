const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");
const port =  process.env.PORT || 5000;
const logger = require("morgan");

//routes

const categoryRoute = require("./routes/categories");
const productRoute = require("./routes/products");
const billRoute = require("./routes/bills");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);



app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
