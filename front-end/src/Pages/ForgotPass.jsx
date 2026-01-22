import { useState } from "react";
import { api } from "../utlis/api";
import { useNavigate } from "react-router";

const ForgotPass = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const respos=await api.post('/forgot-otp',{email})
      console.log("password sent",respos.status);
      if(respos.status===200){
        navigate('/reset-password')
      }
      
    } catch (error) {
      console.log("error while sending the otp", error);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset OTP to your email. Check your inbox and follow the instructions.
            </p>
            <Link
              to="/reset-password"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Back to OTP page
            </Link>
          </div>
        </div>
      </div>
    );
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