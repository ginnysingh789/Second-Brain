import mongoose, { Models, Mongoose, Schema } from "mongoose";

//User Scheme First
const userScheme = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
export const UserModel = mongoose.model('User', userScheme);
