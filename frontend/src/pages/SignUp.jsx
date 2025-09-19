import React, { useContext, useState } from 'react'
import bg from "../assets/bg.jpeg"
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios"

function SignUp() {
  const [showPassword,setShowPassword]=useState(false)
  const {serverUrl,userData,setUserData}=useContext(userDataContext)
  const navigate=useNavigate()
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [loading,setLoading]=useState(false)
  const [password,setPassword]=useState("")
  const [err,setErr]=useState("")

  const handleSignUp=async (e)=>{
    e.preventDefault()
    setErr("")
    setLoading(true)
    try {
      let result=await axios.post(`${serverUrl}/api/auth/signup`,{
        name,email,password
      },{withCredentials:true} )
      setUserData(result.data)
      setLoading(false)
      navigate("/customize")
    } catch (error) {
      console.log(error)
      setUserData(null)
      setLoading(false)
      setErr(error.response.data.message)
    }
  }

  return (
    <div 
      className="w-full h-screen bg-cover bg-center flex justify-center items-center relative overflow-hidden" 
      style={{backgroundImage:`url(${bg})`}}
    >
      {/* overlay gradient for glossy neon effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000cc] via-[#00000088] to-[#000000cc] backdrop-blur-sm"></div>

      <form 
        className="relative w-[90%] max-w-[460px] bg-[#0d0d0d80] border border-white/20 
                   rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.8)] 
                   p-10 flex flex-col items-center gap-6 animate-fadeIn
                   backdrop-blur-2xl transition-all duration-500"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-3xl font-extrabold text-center tracking-wide drop-shadow-md">
          Create your <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 text-transparent bg-clip-text">Virtual Assistant</span> Account
        </h1>

        <input 
          type="text" 
          placeholder="Full Name" 
          className="w-full h-[55px] outline-none border border-white/20 bg-white/10 text-white 
                     placeholder-gray-400 px-5 rounded-xl text-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                     shadow-inner transition-all duration-300" 
          required 
          onChange={(e)=>setName(e.target.value)} 
          value={name}
        />

        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full h-[55px] outline-none border border-white/20 bg-white/10 text-white 
                     placeholder-gray-400 px-5 rounded-xl text-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                     shadow-inner transition-all duration-300" 
          required 
          onChange={(e)=>setEmail(e.target.value)} 
          value={email}
        />

        <div className="w-full h-[55px] border border-white/20 bg-white/10 rounded-xl text-white 
                        relative flex items-center px-5 shadow-inner 
                        focus-within:ring-2 focus-within:ring-blue-500 transition">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="w-full h-full bg-transparent outline-none text-lg placeholder-gray-400" 
            required 
            onChange={(e)=>setPassword(e.target.value)} 
            value={password}
          />
          {!showPassword 
            ? <IoEye className="absolute right-4 w-6 h-6 text-gray-300 cursor-pointer hover:text-blue-400 transition-colors" onClick={()=>setShowPassword(true)}/> 
            : <IoEyeOff className="absolute right-4 w-6 h-6 text-gray-300 cursor-pointer hover:text-blue-400 transition-colors" onClick={()=>setShowPassword(false)}/>
          }
        </div>

        {err.length>0 && <p className="text-red-400 text-sm font-medium animate-pulse">⚠ {err}</p>}

        <button 
          className="w-full h-[55px] mt-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 
                     text-white font-bold rounded-xl text-lg shadow-lg 
                     hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:scale-[1.03] active:scale-[0.98]
                     transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p 
          className="text-gray-300 text-sm mt-4 cursor-pointer hover:text-blue-400 hover:underline transition"
          onClick={()=>navigate("/signin")}
        >
          Already have an account? <span className="text-blue-400 font-semibold">Sign In</span>
        </p>
      </form>
    </div>
  )
}

export default SignUp
