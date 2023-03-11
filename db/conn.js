const mongoose = require("mongoose")
require("dotenv").config()

// const Database = process.env.MONGO_DB_URI
mongoose.set("strictQuery","false")
module.exports =  mongoose.connect("mongodb+srv://Xnargy042:XNARGY12345@cluster0.i18iuei.mongodb.net/ScanedData")
.then(() => console.log("connection succesfully set"))
.catch((err) => console.log(err));