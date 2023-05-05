import mongoose from 'mongoose';
//defining schema for database
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String}
});

//creating model of the above schema
//in controller we can import this model and can create a lot of instances 

export default mongoose.model("user",userSchema);


