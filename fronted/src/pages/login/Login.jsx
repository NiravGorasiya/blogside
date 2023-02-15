import "./login.css";
import { useContext,useState, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef()
  const [error, setError] = useState(false);
  
  const {dispatch,isFetching}= useContext(Context)
    
    const userLogin =async(e)=>{
      e.preventDefault()
      dispatch({type:"LOGIN_START"})
      try {
        const res=await axios.post("http://localhost:5000/api/auth/login",{
          username:userRef.current.value,
          password:passwordRef.current.value
        })
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
      } catch (error) {
        dispatch({type:"LOGIN_FAILURE"})
        setError(true);
      }
    }
  
  
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your username..." ref={userRef} name="username"/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef} name="password" />
        <button className="loginButton" onClick={userLogin} >Login</button>
      </form>
        <Link to="/register">
          <button className="loginRegisterButton">Register</button>
          Don't have an account? Sign up
        </Link>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
