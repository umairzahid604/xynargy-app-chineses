const mongoose = require("mongoose")
require("dotenv").config()
const DB = require("../conn")

// Use the DB object here
DB.then(() => console.log("connection successfully set"))
  .catch((err) => console.log(err));


const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    unique:false
  },
  imageUrl: {
    type: String,
    required: true
  },

  simpleData: {
    type: Array,
    required: true
  },
  maskedData: {
    type: Array,
    required: true
  }
},{timestamps:true});
mongoose.models = {}
const User = mongoose.model('User', userSchema);
module.exports = User;

// new User({
//   email:"zahids@gmail.com",
//   imageUrl:"hello",
//   simpleData:["hello"],
//   maskedData:["hello"]

// }).save()




// // const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// // // import fetch from "node-fetch"
// // var data = JSON.stringify({
// //   "collection": "users",
// //   "database": "ScanedData",
// //   "dataSource": "Cluster0",
// //   "projection": {
// //       "_id": 1
// //   }
// // });
          
// // var config = {
// //   method: 'post',
// //   url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-ztjrl/endpoint/data/v1/action/findOne',
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Access-Control-Request-Headers': '*',
// //     'api-key': 'Mon2ib98rHDXhsv3HHNCB4XHtNDx4V2T1Fw5yke8BNDeegQxYmamly1r4Nq62o1v',
// //     'Accept': 'application/ejson'
// //   },
// //   data: data
// // };
            
// // fetch(config)
// //     .then(function (response) {
// //         console.log(JSON.stringify(response.data));
// //     })
// //     .catch(function (error) {
// //         console.log(error);
// //     });


// const date = new Date(Date.now()).toISOString();
// console.log(date)

// const year = date.getFullYear();
// const month = date.getMonth() + 1; // Add 1 to the month index to get 1-12 instead of 0-11
// const day = date.getDate();

// const formattedDate = `${year}-${month}-${day}`;
// console.log(formattedDate)