// import { memo } from 'react';

import { useEffect } from "react";
import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { api } from "../utlis/api";

const Login = () => {
    const [login,setLogin]=useState(false)
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const useNav=useNavigate()

    const handleemailInput=(e)=>{
        setEmail(e.target.value)
    }
    
    const handlpasslInput=(e)=>{
        setPassword(e.target.value)
    }
    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            const respos=await api.post('/login',{email,password});
            console.log('status:', respos.status);      
            console.log("data",respos.data)
            // if(respos)
           if(respos.data){
            setLogin(true)
            useNav('/')
           }
            
        } catch (error) {
            console.log("erro",error)
        }


    }

  return (
    <div className="flex flex-col min-h-[100vh] justify-center items-center ">
      {/* <h2>Login</h2> */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 pb-10">
        <label>Email</label>
        <input placeholder="please enter your email" className="border border-black px-5 py-3 rounded-2xl text-lg" value={email} onChange={handleemailInput} />
        
        <label>Password</label>
        <input placeholder="please enter your password" className="border border-black px-5 py-3 rounded-2xl text-lg" value={password} onChange={handlpasslInput} />
        <Link to={'/forgot-password'} className="text-blue-400 cursor-pointer">Forgot password</Link>
        <button type="submit" className="bg-blue-600 rounded-2xl px-12 py-6 w-full cursor-pointer">Login</button>

      </form>
      <p>Dont have account please <Link to={'/rigster'} className="underline text-blue-500 cursor-pointer">registre here</Link></p>
      
    </div>
  );
};

export default Login;