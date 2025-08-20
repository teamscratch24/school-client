import { useState } from "react";
import "./Login.css";
import Urls from "../../utils/Api";
import axiosInstance from "../../utils/apiRequest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    try {
      e.preventDefault()
    axiosInstance.post(Urls.LOGIN,{email,password}) 
      .then((response) => {
          if (response.status === 200) {
            if(localStorage?.token){
              localStorage.removeItem("token")
            }
            localStorage.setItem("token",response.data.token)
            window.location.href = "/admin/dashboard";
          }
        }).catch((err) => {
          alert(err.response.data.msg)
        
        })
    } catch (error) {
     
    }
  };

  return (
    <div className="login-container">
      <div className="login_content">
        <h1>Login Page</h1>
        <form className="login-form" onSubmit={(e)=>handleLogin(e)}>
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">
              Admin Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              className="login-input"
              pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password" className="login-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}"
              className="login-input"
            />
          </div>
        <button
          className="login-button"
          type="submit"
        >
          Login
        </button>
        </form>
        <p className="login-text">
          Need help? <a href="/help">Help</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
