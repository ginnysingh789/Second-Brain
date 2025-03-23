import mongoose, { Types } from "mongoose";
const contentType = ['audio', 'video', 'article', 'image']//Ensure only type contain one of this value not any other
const contentScheme = new mongoose.Schema(
    {
        link: { type: String, require: true },
        type: { type: String, enum: contentType, required: true },
        title: { type: String, required: true },
        tags: [{ type: Types.ObjectId, ref: 'Tag' }],//Ref will point to the Tag Scheme 
        userId: { type: Types.ObjectId, ref: 'User', required: true }//Same as the Tag Scheme |point to User

    }
)
export const ContentModel=mongoose.model('Content',contentScheme);