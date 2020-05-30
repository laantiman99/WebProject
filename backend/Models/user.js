const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required:true, unique: true},
  password: {type:String, required:true},

  rank: {type:String, required:true},


  tennis: {type:String, required:false},
  table: {type:String, required:false},
  badminton: {type:String, required:false},
  squash: {type:String, required:false},

  roleId: {type:String, required:true}

});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("userModel", userSchema);
