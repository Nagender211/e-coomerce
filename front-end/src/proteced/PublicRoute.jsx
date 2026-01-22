import { Navigate, useNavigate } from "react-router-dom";


export const PublicRoute=({user,children })=>{
    if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}