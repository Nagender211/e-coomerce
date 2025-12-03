import mongoose, { model } from "mongoose";
const productschema=new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,

    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    brand: {
        type: String,
        trim: true

    },
    categeroy: {
        type: String,
        enum: ["electronics","agriculture","education","sports","dress","male dersse","female dress","general"],
        required: true
    },
    imgurl: [String]},{timestamps: true})

export default mongoose.model("Product",productschema)