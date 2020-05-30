const mongoose = require ("mongoose");


const dashboardSchema = mongoose.Schema({
  userName: {type: String, required:true},
  rank: {type:String, required:true},
  practiceSessions:{type:Number, required:true},
  practiceDate:{type:Date, required:true},
  creator: { type: mongoose.Schema.Types.ObjectId, ref:"userModel", required:true}
  //practiceDuration{type:Time}
});

module.exports = mongoose.model("dash", dashboardSchema);
