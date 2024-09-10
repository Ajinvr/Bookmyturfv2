import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role :{
        type: String,
        enum: ["manager" , "admin"],
        default: "manager"
    }

}, { timestamps: true });

export const manager = mongoose.model("manager",managerSchema)