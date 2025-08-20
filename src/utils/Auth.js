import { Navigate } from "react-router-dom";
import  isTokenExpired  from "./JwtTokenVerify";

const Auth =  ({ component }) => {
  const token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    return <Navigate to="/admin" replace />;
  }

  return component;

};

export default Auth;

