import User from "../model/userSchema.js"
import bcrypt from 'bcrypt'
import { sinupToken } from "../utils/jwt.js"


const cookieOPtion={
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    sameSite: 'lax'
}
export const testing=(req,res)=>{
    res.send({messgae: "hello"})
}


export const signup=async(req,res)=>{
   try {
    const {username,email,password,confomrpassword}=req.body;
    if(password !== confomrpassword){
        return res.status(400).json({message: "please enter the correct password"})
    }
    if(!username || !email || !password){
        return res.status(400).json({ message: "please fill the all the deatles" });

    }
    const exitingUser=await User.findOne({email});
    if(exitingUser){
        return res.status(400).json({ message: "Email already registered" });

    }
    const salt=10;
    const hashPassword=await bcrypt.hash(password,salt);
    const newUser=await User.create({username,email,password: hashPassword})
    const token=sinupToken({id: newUser._id,email: newUser.email})
    res.cookie('token',token,cookieOPtion)
    res.status(201).json({
        message: "singup is susscefuly",
        user: {id: newUser._id,email: newUser.email}
        
    })
    console.log(token);
    
   
   } catch (error) {
    console.log("error",error)
    
   }
}


export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(401).json({
                message: "please enter your password and email"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(402).json({
                message: "email is not found"
            })
        }
        const isCorrecetedPassword=await bcrypt.compare(password,user.password);
        if(!isCorrecetedPassword){
            return res.status(401).json({
                message: "passowrd is not correct or not matching"
            })
        }
        // const resposive
        const token=sinupToken({id: user._id, email: user.email});
        res.cookie('token',token,cookieOPtion) 
        
        res.status(200).json({
            message: "loggin is succefuly",
            user: {id: user._id, email: user.email}
        })
        console.log(token)




    } catch (error) {
        console.log("error",error)
        
    }

}
export const loggout=async(req,res)=>{
    try {
        res.clearCookie("token",cookieOPtion)
        res.status(200).json({
            message: "logg out succesfuly"
        });
    } catch (error) {
        return res.status(401).json({message: "something went worng please try again "})
    }
}

export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const { id } = req.params;

    const updateuser = await User.findByIdAndUpdate(
      id,
      {email,username},
      { new: true, runValidators: true }
    );


    return res.status(200).json({
      message: "user details are updated",
      email: updateuser.email,
      username: updateuser.username
    });

  } catch (error) {
    console.error("error while updating the user:", error);
    return res.status(500).json({
      message: "error while updating the user"
    });
  }
};

export const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params;
       const deleteuser=await User.findByIdAndDelete(id)

    if (!deleteuser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.clearCookie("token",cookieOPtion)

    res.status(200).json({
        message: "user is deleted",
        id: deleteuser._id
    })
        
    } catch (error) {
        return res.status(501).json({
            message: "server error during delete user"
        })
    }
}

export const getAllUser=async(req,res)=>{
    try {

        const user=await User.find();
        res.status(200).json({
            message: "all the data",
            user: user
        })
        
    } catch (error) {
        return res.status(501).json({message: "something went worng 501 gateway "})
    }
}


export const forgotPass=async(req,res)=>{
    try {
        const {otp}=req.body;
        if(!otp){
            return res.status(401).json({
                message: "please fill the otp once"
            })
        }
        const optUdate=await User.findOne(otp);
        


    } catch (error) {
        
    }
}
//  default {testing,signup,login,updateUser,getAllUser}