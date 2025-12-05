import mongoose from "mongoose";
import validator from "validator"
const mongoShema=mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "please enter an validate email"

        }
    },
    password: {
        type: String,
        required: true
    },
    otp: {
       type: String,
       
    },
    otpexpiretime: {
        type: Date,
    },
    isverfiyed: {
        type: Boolean,
        default: false,

    },
    verifyopt: {
        type: String
    },
    verifyexpire: {
        type: Date
    }
});
export default mongoose.model("User",mongoShema)