import React from 'react'
import './css/Signup.css'
import './css/Signup2.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Signup() {
          const navigate = useNavigate()

          const[formdata,setformdata]=useState({name:"",email:"",dob:"",mobile:"",password:"",confirmpassword:""})
          const change =(e)=>{
                    setformdata({...formdata,[e.target.name]:e.target.value})
          }

          const handlesubmit=(e)=>{
                    try {
                              e.preventDefault()
                    const name = formdata.name
                    const email = formdata.email
                    const dob = formdata.dob
                    const mobile = formdata.mobile
                    const password = formdata.password
                    const confirmpassword = formdata.confirmpassword

                    const data = {name,email,dob,mobile,password,confirmpassword}
                    axios.post('http://localhost:3001/user/signup',data).then((res) => {
                              console.log(res)
                              navigate('/login')
                              

                    }

                    ).catch((e)=>{
                              console.log(e)
                    })

                              
                    } catch (error) {
                              console.log(error)
                              
                    }
                    



          }
          
          return (
                    <div className='main'>
                              <form className="form">
                                        <span>Name : <input type="text" name="name" onChange={change}/></span>
                                        <span>Email : <input type="text" name="email" onChange={change}/> </span>
                                        <span>Dob : <input type="date" name="dob" onChange={change}/> </span>
                                        <span>Mobile : <input type="text" name="mobile" onChange={change}/> </span>
                                        <span>Password : <input type="text" name="password" onChange={change} /> </span>
                                        <span>Confirm Password : <input type="text" name="confirmpassword" onChange={change}/> </span>
                                        <span className='button'><button onClick={handlesubmit}>Sign Up</button></span>
                                        <span className='message'>Have an Account <a href="/login">Log In</a></span>


                              </form>

                    </div>
          )
}

export default Signup
