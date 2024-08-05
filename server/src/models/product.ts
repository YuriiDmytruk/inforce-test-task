import mongoose, { Schema } from "mongoose";
import { commentSchema } from "./comment";

const productSchema = new Schema({
    imageURL: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    size: {
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    weight: {
        type: Number,
        required: true
    },
    comments: [{
        type: commentSchema,
        required: true
    }]
});

export const Product = mongoose.model('Product', productSchema)