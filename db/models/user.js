const mongoose = require("mongoose")
require("dotenv").config()
const db = require("../conn")

const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    unique:false
  },
  imageUrl: {
    type: String,
    required: true
  },
  // image_id:{type:String,required:true},
  // batch_id: {type:String,required:true},
  // subject_id: {type:String,required:true},
  // subject_name: {type:String,required:true},
  // dataset_id: {type:String,required:true},
  // company_id: {type:String,required:true},
  // application_id: {type:String,required:true},
  // application_name: {type:String,required:true},
  // application_run_id: {type:String,required:true},

  simpleData: {
    type: Array,
    required: true
  },
  maskedData: {
    type: Array,
    required: true
  }
});
mongoose.models = {}
const User = mongoose.model('User', userSchema);

module.exports = User;
