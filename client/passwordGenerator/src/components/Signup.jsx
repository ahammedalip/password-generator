import React, { useState } from 'react'


import api from '../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Signup({notify}) {

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = async () => {
    try {
      const response = await api.post('/auth/signup', signUpData)
      console.log(response.data)
      if (response.data.success) {
        notify('Signed up successfully!','success');
        navigate('/login')
      }
      
    } catch (error) {
      console.log('erorr at signup ',error.response.data.message)
      errNot(error.response.data.message)
    }

  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('../../public/landing.jpg')]">
      <div className="bg-white/5 p-8 rounded-lg shadow-md border border-gray-500 w-full max-w-xs" style={{ backdropFilter: 'blur(5px)' }}>
        <div className='space-y-5'>
          <div>
            <input type="text" placeholder='Enter Name' value={signUpData.name} onChange={handleChange} name='name'
              className='w-full rounded-lg text-white bg-white/20 py-2 px-4 border-b border-gray-300 focus:outline-none focus:border-red-500' />
          </div>
          <div>
            <input type="email" placeholder='Enter email' value={signUpData.email} onChange={handleChange} name='email'
              className='w-full rounded-lg text-white bg-white/20 py-2 px-4 border-b border-gray-300 focus:outline-none focus:border-red-500' />
          </div>
          <div>
            <input type="password" placeholder='Enter password' value={signUpData.password} onChange={handleChange} name='password'
              className='w-full rounded-lg text-white bg-white/20 py-2 px-4 border-b border-gray-300 focus:outline-none focus:border-red-500' />
          </div>
          <div className='flex items-center justify-center'>
            <button onClick={onSubmit} className=' rounded-lg bg-white/20 py-2 px-4 hover:bg-white/50 text-white hover:text-black transition-colors duration-200 ease-in-out'>Sign In</button>
          </div>
          <div className='flex items-center justify-center'>
            <h2 className='text-gray-400'>Already a user? <a>Sign In</a></h2>
          </div>
        </div>
      </div>
    </div>
  )
}
