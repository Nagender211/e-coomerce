import { api } from "./api";
export const checkAuth=async()=>{
    try {
        const res=await api.get('/me')
        return res.data.user
    } catch (error) {
        console.log("error while making the check ing the auth",error)
        return null
    }
}