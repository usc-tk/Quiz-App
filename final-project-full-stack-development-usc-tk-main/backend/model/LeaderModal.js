import mongoose from "mongoose";

const LeaderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    }
  
})


const Leader = mongoose.models.LeaderSchema || mongoose.model('Leader', LeaderSchema);
export default Leader;

