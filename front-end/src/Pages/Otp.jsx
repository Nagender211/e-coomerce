import { useState } from "react";
import { api } from "../utlis/api";
import { useNavigate } from "react-router";

const Otp = () => {
    // const [email,setEmail]=useState('')
    const [otp,setOtp]=useState('');
    const [password,setPassword]=useState('');
    const [confomrpassword,setConfomrpassword]=useState('');
    const navigate=useNavigate()

  const handlpasslInput = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handlConforPasslInput = (e) => {
    setConfomrpassword(e.target.value);
    setError("");
  };

  const handleOtp = (e) => {
    setOtp(e.target.value);
    setError("");
  };


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
        setLoading(true);
    setError("");
    try {
      const respos = await api.post("/reset-pass", { otp, password, confomrpassword });
      console.log("respose", respos.data);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.log("error while creating the reset password", error);
      setError(error.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }


    }
    
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
            <p className="text-gray-600 mb-6">
              Your password has been successfully reset. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handlrest} className="flex flex-col items-center justify-center gap-3">
         {/* <label>Email</label>
        <input placeholder="please enter your email" className="border border-black px-5 py-3 rounded-2xl text-lg" value={email} onChange={handleemailInput} /> */}
        <label>otp</label>
         <input placeholder="please enter your confomr password" className="border border-black px-5 py-3 rounded-2xl text-lg" value={otp} onChange={handleOttp} />

      <div className="max-w-md w-full relative z-10">
        {/* Back Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Login</span>
        </Link>
        </div>

         <label>Confomr password</label>
        <input placeholder="please enter your confomr password" className="border border-black px-5 py-3 rounded-2xl text-lg" value={confomrpassword} onChange={handlConforPasslInput} />
            <button type="submit" className="border px-4 py-2 cursor-pointer">Submit</button>
        
      </form>
    </div>
  );
};

export default Otp;