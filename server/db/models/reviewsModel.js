import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    turfId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default:1
    },
    description: {
        type: String
    }
}, { timestamps: true });

export const review = mongoose.model("review", reviewSchema);
