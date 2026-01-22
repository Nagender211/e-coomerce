import { useState } from "react";
import { api } from "../utlis/api";
import { useNavigate } from "react-router";
import { checkAuth } from "../utlis/auth";

const VerifyEmailOtp = ({setUser}) => {
    const [verifyopt,setVerifyopt]=useState();
    const navigate=useNavigate()
    const handleOtp=(e)=>{
        setVerifyopt(e.target.value)
    }
    const handleVerifOtp=async(e)=>{
        e.preventDefault();
        const res=await api.post('/verify-email/conform',{verifyopt})
        // const checkUser=await checkAuth();
        // setUser(checkUser)
        console.log(res)
        if(res.status===200){
            navigate('/my-produts')
        }
     

    }
  return (
    <div>
      <h2>VerifyEmailOtp</h2>
      <form onSubmit={handleVerifOtp}>
        <input placeholder="enter your otp here" value={verifyopt} onChange={handleOtp} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VerifyEmailOtp;