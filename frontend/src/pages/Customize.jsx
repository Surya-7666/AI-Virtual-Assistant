import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.jpeg"
import image2 from "../assets/image2.jpeg"
import image3 from "../assets/image3.jpeg"
import image4 from "../assets/image4.jpeg"
import image5 from "../assets/image5.jpeg"
import image6 from "../assets/image6.jpeg"
import bg from "../assets/bg.jpeg"
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
  const { serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage } = useContext(userDataContext)
  const navigate = useNavigate()

  const inputImage = useRef()

  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] flex justify-center items-center flex-col p-[20px] relative overflow-hidden'>
      
      {/* floating gradient orbs for modern feel */}
      <div className="absolute w-[300px] h-[300px] bg-purple-700/30 rounded-full blur-3xl top-[-50px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[250px] h-[250px] bg-blue-600/30 rounded-full blur-3xl bottom-[-80px] right-[-60px] animate-pulse"></div>

      {/* Back button */}
      <MdKeyboardBackspace 
        className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[35px] h-[35px] hover:scale-110 transition-all duration-300 hover:text-blue-300' 
        onClick={() => navigate("/")} 
      />

      {/* Title */}
      <h1 className='text-white mb-[40px] text-[36px] md:text-[42px] font-extrabold tracking-wide text-center drop-shadow-lg'>
        Select your <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-purple-400'>Assistant Image</span>
      </h1>

      {/* Cards section */}
      <div className='w-full max-w-[1000px] flex justify-center items-center flex-wrap gap-[20px]'>
        <Card image={image1}/>
        <Card image={image2}/>
        <Card image={image3}/>
        <Card image={image4}/>
        <Card image={image5}/>
        <Card image={image6}/>
        <Card image={bg}/>

        {/* Upload custom image card */}
        <div 
          className={`w-[80px] h-[150px] lg:w-[170px] lg:h-[270px] bg-[#ffffff08] backdrop-blur-xl border-2 border-[#0000ff44] rounded-3xl overflow-hidden 
          flex items-center justify-center shadow-md cursor-pointer 
          hover:scale-105 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900 transition-all duration-300 
          ${selectedImage=="input" ? "border-4 border-blue-200 shadow-2xl shadow-blue-900" : ""}`}
          onClick={() => {
            inputImage.current.click()
            setSelectedImage("input")
          }}
        >
          {!frontendImage &&  
            <RiImageAddLine className='text-white w-[30px] h-[30px] opacity-70 hover:opacity-100 transition'/>}
          {frontendImage && 
            <img src={frontendImage} className='h-full w-full object-cover'/>}
        </div>

        <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
      </div>

      {/* Next button */}
      {selectedImage && 
        <button 
          className='min-w-[170px] h-[60px] mt-[40px] font-semibold cursor-pointer rounded-full text-[20px] 
          bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300'
          onClick={() => navigate("/customize2")}
        >
          Next →
        </button>
      }
    </div>
  )
}

export default Customize
