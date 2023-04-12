const mongoose = require("mongoose")
require("dotenv").config()

// const Database = process.env.MONGO_DB_URI
mongoose.set("strictQuery","false")
module.exports =  mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000 })
.then(() => console.log("connection succesfully set"))
.catch((err) => console.log(err));