import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    }
})


const Question = mongoose.models.QuestionSchema || mongoose.model('Question', QuestionSchema);
export default Question;

