import { useEffect, useState } from "react";
import { api } from "../utlis/api";
import { useNavigate } from "react-router";

const Otp = () => {
    // const [email,setEmail]=useState('')
    const [otp,setOtp]=useState('');
    const [password,setPassword]=useState('');
    const [confomrpassword,setConfomrpassword]=useState('');
    const navigate=useNavigate()


    
  const handlpasslInput=async(e)=>{
    // console.log("hello")
    setPassword(e.target.value);

  }
   const handlConforPasslInput=async(e)=>{
    // console.log("hello")
    setConfomrpassword(e.target.value);

  }
   const handleOttp=async(e)=>{
    // console.log("hello")
    setOtp(e.target.value);

  }
    const handlrest=async(e)=>{
        e.preventDefault();
        try {
            const respos=await api.post('/reset-pass',{otp,password,confomrpassword});
            console.log("respose",respos.data)
            if(respos.status===200){
                navigate('/login')
            }

        } catch (error) {
            console.log("error while creating the reset password",error)
        }

    }
   

  return (
    <div>
      <form onSubmit={handlrest} className="flex flex-col items-center justify-center gap-3">
         {/* <label>Email</label>
        <input placeholder="please enter your email" className="border border-black px-5 py-3 rounded-2xl text-lg" value={email} onChange={handleemailInput} /> */}
        <label>otp</label>
         <input placeholder="please enter your confomr password" className="border border-black px-5 py-3 rounded-2xl text-lg" value={otp} onChange={handleOttp} />

         <label>Password</label>
        <input placeholder="please enter your password" className="border border-black px-5 py-3 rounded-2xl text-lg" value={password} onChange={handlpasslInput} />

         <label>Confomr password</label>
        <input placeholder="please enter your confomr password" className="border border-black px-5 py-3 rounded-2xl text-lg" value={confomrpassword} onChange={handlConforPasslInput} />
            <button type="submit" className="border px-4 py-2 cursor-pointer">Submit</button>
        
      </form>
    </div>
  );
};

export default Otp;