import axios from "axios"
import { useState } from "react"
import "./register.css"
import { Link } from "react-router-dom"

export default function Register() {
    const [username,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState(false);
  
    
    const userRegister =async(e)=>{
      e.preventDefault()
      setError(false);
      try {
        const res= await axios.post("http://localhost:5000/api/auth/register",{
          username,
          email,
          password
        })
        res.data && window.location.replace("/login")
      } catch (error) {
        setError(true);
      }
    }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm">
        <label>Username</label>
        <input 
          className="registerInput" 
          type="text" 
          placeholder="Enter your username..."  
          onChange={(e)=>setUserName(e.target.value)}
          />
        <label>Email</label>
        <input className="registerInput" 
          type="text" 
          placeholder="Enter your email..."
          onChange={(e)=>setEmail(e.target.value)}
           />
        <label>Password</label>
        <input 
          className="registerInput" 
          type="password" 
          placeholder="Enter your password..."
          onChange={(e)=>setPassword(e.target.value)}
           />
        <button className="registerButton" type="submit" onClick={userRegister}>Register</button>
      </form>
        <button className="registerLoginButton">Login</button>
        <Link to="/login">
          You are Already Logged in
        </Link>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
    )
}
