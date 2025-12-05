import User from "../model/userSchema.js"
import bcrypt from 'bcrypt'
import { sinupToken } from "../utils/jwt.js"
import { sendEmail } from "../utils/sendEmail.js"


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
        const {email}=req.body;
        if(!email){
            return res.status(401).json({
                message: "please enter the email"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "user is not found or email is not found"
            })
        }
        const otp=Math.floor(100000+Math.random()*900000).toString();
        // const otpexpiretime=
        user.otp=otp;
        user.otpexpiretime=Date.now()+10*60*1000;
        await user.save();

        await sendEmail({
            to: user.email,
            subject: 'your rest passowrd otp',
            text: `here is your rest opt ${otp} and will expiren in 10min`
        })
        res.status(200).json({
            message: "opt is sent succesufully"
        })

    } catch (error) {
        console.log("for got pass eroor",error)
       return res.status(401).json({message: "somethign went wrong while otp is sending"}) 
    }
}


export const resetPassword=async(req,res)=>{
    try {
        const {email,otp,password,confomrpassword}=req.body;
        if(!password || !confomrpassword){
            return res.status(501).json({
                message: "please fill the filds"
            })
        }
        // if(otp)
        // if(opt!==opt)
        
        const user=await User.findOne({email});
        if(!user.otp || !user.otpexpiretime){
            return res.status(403).json({
                message: "opt is not generated to the user"
            })
        }
        const now=Date.now();
        if(user.otpexpiretime <now){
            return res.status(400).json({
                message: "opt is expired"
            })
        }
        if(otp!==user.otp){
            return res.status(401).json({
                message: "opt is not matcech"
            })
        }
        const salt=10;
        const hasspaword=await bcrypt.hash(password,salt)
        user.password=hasspaword;
        user.otp=undefined;
        user.otpexpiretime=undefined;
        await user.save();
        res.status(200).json({
            message: "password rest is done"
        })


        
    } catch (error) {
        console.log("reset error",error)
        return res.status(502).json({
            message: "server error while reset password"
        })
    }

}
//  default {testing,signup,login,updateUser,getAllUser}





// verify email;
export const sendVrification=async(req,res)=>{
    try {
        // const {}
        const userId=req.user.id;

        const user=await User.findById(userId);
        if(!user){
            return res.json({
                message: "user is not found"
            })
        }
        const verifyopt=Math.floor(100000+Math.random()*90000).toString();
        user.verifyopt=verifyopt
        user.verifyexpire=Date.now()+10*60*1000;
        await user.save();

        sendEmail({
            to: user.email,
            subject: "opt for the verification and post the prodoucts",
            text: `please enter the opt ${verifyopt} this is expir the 10min`
        })
        res.status(200).json({
            message: "otp is succefuly please check the inbox"
        })


    } catch (error) {
        console.log("error at the email verifictoi",error);
        return res.status(501).json({
            message: "server is error while sending the opt pleae try after a while"
        })
    }
}


export const verifyEmailOtp=async(req,res)=>{
    try {
        const {verifyopt}=req.body;
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({
                message: "userId is not found"
            })
        }
         if(!verifyopt){
            return res.status(401).json({
                message: "please enter the opt"
            })
        }
        const user=await User.findById(userId)
        if(!user){
            return res.status(401).json({
                message: "usre is not found"
            })
        }
        const now=Date.now();
        if(user.verifyexpire<now){
            return res.status(401).json({
                message: "otp is expire"
            })
        }
        if(user.verifyopt!==verifyopt){
            return res.status(401).json({
                message: "otp is not matchecd"
            })

        }
        user.isverfiyed=true;
        user.verifyopt=undefined;
        user.verifyexpire=undefined;
        await user.save()
        res.status(200).json({
            message: "verified user enjoy posting the your prodoucts"
        })

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
        message: "server error while verifying otp",
        });

        
    }
}