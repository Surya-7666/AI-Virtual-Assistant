import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Customize2() {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext)
  const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpdateAssistant = async () => {
    setLoading(true)
    try {
      let formData = new FormData()
      formData.append("assistantName", assistantName)
      if (backendImage) {
        formData.append("assistantImage", backendImage)
      } else {
        formData.append("imageUrl", selectedImage)
      }
      const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true })
      setLoading(false)
      console.log(result.data)
      setUserData(result.data)
      navigate("/")
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] flex justify-center items-center flex-col p-[20px] relative overflow-hidden'>
      
      {/* floating gradient orbs */}
      <div className="absolute w-[300px] h-[300px] bg-blue-600/30 rounded-full blur-3xl top-[-50px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[250px] h-[250px] bg-purple-600/30 rounded-full blur-3xl bottom-[-80px] right-[-60px] animate-pulse"></div>

      {/* Back Button */}
      <MdKeyboardBackspace 
        className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[35px] h-[35px] hover:scale-110 transition-all duration-300 hover:text-blue-300' 
        onClick={() => navigate("/customize")} 
      />

      {/* Title */}
      <h1 className='text-white mb-[40px] text-[36px] md:text-[42px] font-extrabold tracking-wide text-center drop-shadow-lg'>
        Enter Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-purple-400'>Assistant Name</span>
      </h1>

      {/* Input field with glass effect */}
      <input 
        type="text" 
        placeholder='e.g. Shifra' 
        className='w-full max-w-[600px] h-[65px] outline-none border-2 border-white/40 bg-white/10 backdrop-blur-lg text-white placeholder-gray-300 px-[20px] py-[10px] rounded-2xl text-[20px] focus:border-blue-400 focus:shadow-lg focus:shadow-blue-900 transition-all duration-300' 
        required 
        onChange={(e) => setAssistantName(e.target.value)} 
        value={assistantName}
      />

      {/* Button */}
      {assistantName &&  
        <button 
          className='min-w-[320px] h-[65px] mt-[35px] font-semibold cursor-pointer rounded-full text-[20px] bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={loading} 
          onClick={() => { handleUpdateAssistant() }}
        >
          {!loading ? "✨ Finally Create Your Assistant" : "⏳ Loading..."}
        </button>
      }
    </div>
  )
}

export default Customize2
