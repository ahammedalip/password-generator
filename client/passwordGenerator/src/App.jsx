import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup';
import Login from './components/Login';

import './App.css'
import Home from './components/Home';
export default function App() {
  const notify = (message, type) => {
    toast(message, {
      
      position: "top-center",
      autoClose: 5000, // duration in milliseconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

   
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login notify={notify} />} />
          <Route path='/signup' element={<Signup notify={notify}  />} />
          <Route path='/home' element={<Home notify={notify}/>}  />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}
