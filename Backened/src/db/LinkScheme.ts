import mongoose from "mongoose";

const linkScheme=new mongoose.Schema({
    hash:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true
}})
export  const LinkModel=mongoose.model('Tag',linkScheme)