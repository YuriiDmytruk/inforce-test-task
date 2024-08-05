import mongoose, { Schema } from "mongoose";

export const commentSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

export const Comment = mongoose.model('Comment', commentSchema)