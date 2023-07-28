import React from 'react'
import './css/Login.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
          const navigate = useNavigate()

          const [formdata, setformdata] = useState({ name: "", email: "", dob: "", mobile: "", password: "", confirmpassword: "" })
          const change = (e) => {
                    setformdata({ ...formdata, [e.target.name]: e.target.value })
          }
          const submit = (e) => {

                    e.preventDefault()
                    const name = formdata.name
                    const email = formdata.email
                    const dob = formdata.dob
                    const mobile = formdata.mobile
                    const password = formdata.password
                    const confirmpassword = formdata.confirmpassword

                    const data = { name, email, dob, mobile, password, confirmpassword }
                    axios.post('/user/login', data,{
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              withCredentials: true
                            }).then(() => {
                              navigate('/')
                              
                            })
                            .catch(err => {
                              console.log(err.response.status);
                              if(err.response.status===400){
                                        
                                        window.alert("invalid details")

                              }
                            
                              
                    
                            });
          }

          return (
                    <div className='main'>
                              <form className="form">
                                        <span>Mobile : <input type="Number" placeholder="Enter Mobile Number" name="mobile" onChange={change} /></span>
                                        <span>Password : <input type="password" placeholder="Enter password" name="password" onChange={change} /></span>
                                        <span className='button'><button onClick={submit}>Log in</button></span>
                                        <span className='signuplink'><p>Don't have an Account?</p><a href="/signup">Sign up</a></span>

                              </form>

                    </div>
          )
}


export default Login
