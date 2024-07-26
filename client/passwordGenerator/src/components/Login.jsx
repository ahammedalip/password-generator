import React, { useState } from 'react'
import api from '../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Login({notify}) {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setLoginData(prev=>({
      ...prev, 
      [name]:value
    }))

   
  }
  const onSubmit = async()=>{
    try {
      const response = await api.post('/auth/login', loginData)
      if(response.data.success){
        //console.log(response.data)
        localStorage.setItem('email',response.data.email)
        notify('Login Success')
        navigate('/home')
      }
    } catch (error) {
      console.log('error at login', error)
      notify(error.response?.data?.message || 'Something went wrong')
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('../../public/landing.jpg')]">
      <div className='space-y-4 border border-gray-500 p-10 max-w-xs rounded-lg bg-white/5 ' style={{backdropFilter: 'blur(5px)'}}>
        <div className=''>
          <input type="text" name='email' placeholder='Enter Email' value={loginData.email} onChange={handleChange}
            className='w-full rounded-lg text-white bg-white/20 py-2 px-4 border-b border-gray-300 focus:outline-none focus:border-red-500' />
        </div>
        <div>
          <input type="password" name='password' placeholder='Enter password' value={loginData.password} onChange={handleChange}
            className='w-full rounded-lg text-white bg-white/20 py-2 px-4 border-b border-gray-300 focus:outline-none focus:border-red-500' />
        </div>
        <div className='flex items-center justify-center'>
          <button onClick={onSubmit} className=' rounded-lg bg-white/20 py-2 px-4 hover:bg-white/50 text-white hover:text-black transition-colors duration-200 ease-in-out'>Login</button>
        </div>
        <div className='flex items-center justify-center'>
            <h2 className='text-gray-400' >Already a user? <a>Sign In</a></h2>
          </div>
      </div>

    </div>
  )
}
