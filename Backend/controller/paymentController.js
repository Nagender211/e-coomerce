import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import crypto from 'crypto'
dotenv.config()
export const createOrderInstace = async(req,res)=>{
    try {
        const instanace=new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.SCREATE_KEY
        })
        const options={
            amount: req.body.amount*100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }
        instanace.orders.create(options,(error,order)=>{
            if(error){
                console.log("error whie creating the order",error)
            }
            res.status(200).json({
                data: order
            })
        })
    } catch (error) {
        console.log("error in catch",error)        
    }
}


export const verifyPayment=async(req,res)=>{
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        const sign=razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSing=crypto.createHmac("sha256",process.env.SCREATE_KEY).update(sign.toString()).digest("hex");
        if(expectedSing !== razorpay_signature){
            return res.status(500).json({
                message: "something went wrong"
            })
        }
        return res.status(500).json({
                message: "Payment is succesfuly verified"
            })
    } catch (error) {
        console.log("erro on verificaiton payment".error)
    }
}