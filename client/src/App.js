
import './App.css';

import { useEffect, useState } from 'react';
import Home from './components/Home';
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from './components/Signup';
import Login from './components/Login';
import axios from 'axios'
import Cookies from 'universal-cookie'
import Dashboard from './components/Dashboard';





function App() {
  const cookie = new Cookies()
  const[css,setcss]=useState(false)
  const[log,setlog]=useState(false)

  
  useEffect(() => {
  










    $(window).scroll(function () {
      var scroll = $(window).scrollTop()
      if (scroll >= 200) {
        $('nav').addClass('black')
      }
      else {
        $('nav').removeClass('black')
      }
    })

  })

  useEffect(()=>{
    
    axios.get('/user/notes/fetchnote', {
      withCredentials: true
  }).then(async (res) => {
      if (res.status === 200) {
        setcss(true)

      }
      if (res.status === 400) {
          setcss(false)

      }
  }).catch((e) => {
      setcss(false)

  })

  },[])
  // const signin=(e)=>{
  //   e.preventDefault()
    
    

  // }
  const signout = (e) => {
  
    
    axios.delete('/user/logout', {
      withCredentials: true
    }).then((res) => {
      console.log("deleting")
      if(res.data==="logout"){
        window.location.reload(false)
        cookie.remove('signintoken')
        setcss(false)
        
      
      
      

      }
      
      
      


    }).catch((e) => {
      
      console.log(e)
    })

  }
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <div className="logo">
            <b>LOGO</b>

          </div>
          <div className="menu">
            {!css? <span><a href="/signup">Sign up</a></span>:<span onClick={signout}><p>Sign out</p></span>}
            
            <span><a href="/dashboard">Dashboard</a></span>
            <span><a href="/">Home</a></span>
          </div>

        </nav>
        <Routes className="route">
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard/>} />

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />




        </Routes>
      </div>
    </Router>

  );
}

export default App;
