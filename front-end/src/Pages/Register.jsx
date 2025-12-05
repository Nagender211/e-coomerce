import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utlis/api";

const Register = () => {
    const [username,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confomrpassword,setConfomrpassword]=useState('');

    const navigate=useNavigate()
    const handleUserlInput=(e)=>{
        setUserName(e.target.value)
    }

    const handleemailInput=(e)=>{
        setEmail(e.target.value)
    }

    const handlpasslInput=(e)=>{
        setPassword(e.target.value)
    }

    const handlConforPasslInput=(e)=>{
        setConfomrpassword(e.target.value)
    }

    const handleRegister=async(e)=>{
        e.preventDefault();
        try {
            const respos=await api.post('/signup',{username,email,password,confomrpassword})
            console.log("status",respos.status)
            console.log("data of the created",respos.data);
            if(respos.status===201){
                navigate('/')
            }
        } catch (error) {
            console.log("error while signup",error)
        }
    }


  return (
    <div className="flex flex-col min-h-[100vh] justify-center items-center">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 pb-10">
        <label>Username</label>
        <input placeholder="please enter your Username" className="border border-black px-5 py-3 rounded-2xl text-lg" value={username} onChange={handleUserlInput} />

          <label>Email</label>
        <input placeholder="please enter your email" className="border border-black px-5 py-3 rounded-2xl text-lg" value={email} onChange={handleemailInput} />
        
        <label>Password</label>
        <input placeholder="please enter your password" className="border border-black px-5 py-3 rounded-2xl text-lg" value={password} onChange={handlpasslInput} />

      
        
        <label>Confomr password</label>
        <input placeholder="please enter your confomr password" className="border border-black px-5 py-3 rounded-2xl text-lg" value={confomrpassword} onChange={handlConforPasslInput} />
        <button type="submit" className="bg-blue-600 rounded-2xl px-12 py-6 w-full cursor-pointer">Register</button>

      </form>
      <p>have account please <Link to={'/login'} className="underline text-blue-500 cursor-pointer">Login here</Link></p>
    </div>
  );
};

export default Register;