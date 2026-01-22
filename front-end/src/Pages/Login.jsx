import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utlis/api";
import { checkAuth } from "../utlis/auth";

const Login = ({setUser}) => {
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
            const checkUser=await checkAuth()
            setUser(checkUser)
            // useNav('/')
            
        } catch (error) {
            console.log("erro",error)
        }
    }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 pb-10">
        <label>Email</label>
        <input placeholder="please enter your email" className="border border-black px-5 py-3 rounded-2xl text-lg" value={email} onChange={handleemailInput} />
        
        <label>Password</label>
        <input placeholder="please enter your password" className="border border-black px-5 py-3 rounded-2xl text-lg" value={password} onChange={handlpasslInput} />
        <Link to={'/forgot-password'} className="text-blue-400 cursor-pointer">Forgot password</Link>
        <button type="submit" className="bg-blue-600 rounded-2xl px-12 py-6 w-full cursor-pointer">Login</button>

      </form>
      <p>Dont have account please <Link to={'/register'} className="underline text-blue-500 cursor-pointer">registre here</Link></p>
      

      
    </div>
 );
};


export default Login;