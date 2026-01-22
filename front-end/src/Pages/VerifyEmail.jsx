import { useNavigate } from "react-router";
import { api } from "../utlis/api";
import { checkAuth } from "../utlis/auth";

const VerifyEmail = ({user,setUser}) => {
    const navigate=useNavigate()
    const handleVerify=async(e)=>{
        e.preventDefault();
        const res=await api.post('/verify-email/send-otp')
        // const checkUesr=await checkAuth();
        // setUser(checkUesr)
        // console.log(res)
        if(res.status===200){
            navigate('/verify-email-otp')
        }
    }
  return (
    <div>
      <form onSubmit={handleVerify}>
        <input value={user.email || ""} disabled />
        <button type="submit">Submit</button>
      </form>
      sdnjsad
    </div>
  );
};

export default VerifyEmail;