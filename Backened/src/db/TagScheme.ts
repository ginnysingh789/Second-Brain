//Tag Scheme 
import mongoose from "mongoose";
const tagScheme = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true }
    }
)
export const TagModel = mongoose.model('Tag', tagScheme);
