import User from "../model/userSchema.js";

export const requiredEmailVefry=async(req,res,next)=>{
    try {
        const userId=req.user?.id;
        if(!userId){
            return res.status(501).json({
            message: "Not autinticated"
        })
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(501).json({
            message: "user is not found"
        })
        }
        if(!user.isverfiyed){
            return res.status(501).json({
            message: "email is not verified"
        })    
        }
       next();

    } catch (error) {
        console.log("error",error);
        return res.status(501).json({
            message: "server is error please virify"
        })
    }
}