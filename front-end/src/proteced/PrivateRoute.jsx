import { Navigate } from "react-router"

export const PrivateRoute=({user,children})=>{
    if(!user){
        return <Navigate to={'/register'} replace />
    }
    if(!user.isverfiyed){
        return <Navigate to={'/verify-email'} replace />
    }

    return children
}