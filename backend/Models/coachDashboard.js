const mongoose = require ("mongoose");


const dashboardSchema = mongoose.Schema({
  userName: {type: String, required:true},
  Client: {type:String, required:true},
  Court:{type:Number, required:true},
  creator: { type: mongoose.ObjectId, ref:"userModel", required:true}
  //practiceDuration{type:Time}
});

module.exports = mongoose.model("coachDash", dashboardSchema);
