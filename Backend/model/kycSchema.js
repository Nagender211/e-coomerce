import mongoose from "mongoose";
const kycShema=new mongoose.Schema({
    pancard: {
        type: String,
        required: true
    },
    aadharcard: {
        type: String,
        required: true
    },
    phootoimage: {
        type: String
    },
    bankname: {
        type: String,
        required: true,
        trim: true
    },
    accountholder: {
        type: String,
        required: true,
        trim: true
    },
    accountnumber: {
        type: String,
        required: true,
        trim: true
    },
    ifsc: {
        type: String,
        required: true,
        trim: true,
    },
    isVerify: {
        type: Boolean,
        default: false
    }
});
export default mongoose.model("Kyc",kycShema)