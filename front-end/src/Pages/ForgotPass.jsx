// import { memo } from 'react';

import { useState } from "react";
import { api } from "../utlis/api";
import { useNavigate } from "react-router";

const ForgotPass = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState('')

  const handleEmail=async(e)=>{
    // console.log("hello")
    setEmail(e.target.value);

  }
  const handleForgot=async(e)=>{
    e.preventDefault();
    try {
      const respos=await api.post('/forgot-otp',{email})
      console.log("password sent",respos.status);
      if(respos.status===200){
        navigate('/reset-password')
      }
      
    } catch (error) {
      console.log("error while sending the otp",error)
    }

  }
  return (
    <div>
        <form onSubmit={handleForgot} className="flex flex-col gap-4 justify-center items-center">
            <label>email</label>
            <input className="border" placeholder="please enter your email id" type="email" name="email" required value={email} onChange={handleEmail} />
            <button type="submit" className="cursor-pointer" >Submit Your opt</button>
        </form>
    </div>
  );
};

export default ForgotPass;