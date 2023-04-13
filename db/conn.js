// const mongoose = require("mongoose")
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", "false");
const DB = mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
  })
  .then(() => console.log("connection succesfully set"))
  .catch((err) => console.log(err));

module.exports = DB;