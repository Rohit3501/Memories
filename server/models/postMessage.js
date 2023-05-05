import mongoose from 'mongoose';
//defining schema for database
const postSchema = mongoose.Schema({
    title:String,
    message:String,
    name:String, 
    creator:String,
    tags:[String],
    selectedFile:String,
    likes:{
        //now its going to be array of id's
        type:[String],
        default:[],
    },
    createdAt:{
        type:Date,
        default:new Date()
    },


});

//creating model of the above schema

var PostMessage=mongoose.model('PostMeassage',postSchema);

export default PostMessage;

//on this model we will be able to run our command such as delete update and so on.