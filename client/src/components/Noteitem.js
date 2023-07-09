import React, { useState } from 'react'
import './Noteitems.css'
import axios from 'axios'
import './css/Note.css'




// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


// import { useEffect } from 'react'

function Noteitem(props) {
  

  const[updatevisiblity,setupdatevisiblity]=useState(false)
  const[formdata,setformdata]=useState({title:"",date:"",description:"",status:"",member:""})
  const[noteid,setnoteid]=useState(null)
  


  const { note } = props


  const navigate = useNavigate()




  const deleteitem = async (id) => {
    console.log(id)



    axios.post(`http://localhost:3001/user/notes/delete/${id}`, {
      withCredentials: true
    }).then((res) => {
      
      navigate(0)



    }).catch((e) => {
      console.log(e)
      window.alert("error in delete item")
    })


  }
  const change=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})

  }


  const update=(e)=>{
    setupdatevisiblity(true)
    setnoteid(e)

  }

  const setupdate=(e)=>{
    e.preventDefault()
   


    console.log(formdata)
    axios.put(`http://localhost:3001/user/notes/update/${noteid}`, formdata, {
        withCredentials: true
    }).then((res) => {
        setnoteid(null)
        
        navigate(0)
        setupdatevisiblity(false)
        


    }

    ).catch(async (e) => {
        console.log(e)
    })

    

  }


  

  return (
    <div className='noteitem' style={{ width: "100%", margin: "10px 0px" }}>
      <form method="POST" className={!updatevisiblity?"formupdate none":"formupdate flex"}>

        <span>Title :<input type="text" name='title' placeholder='Title' onChange={change} /></span>
        <span>date :<input type='date' name="date" placeholder='Date' onChange={change} /></span>
        <span>Description :<input type='text' name='description' placeholder='Description' onChange={change} /></span>
        <span className='button'><button type='submit' onClick={setupdate}>Update</button></span>
      </form>



      <div className="title">
        {note.title}

      </div>
      <div className="date" style={{ width: "100%", padding: "20px 10px" }} >Due date - 
        {note.date.slice(0,10)}
      </div>
      <div className="decription" style={{ width: "100%", fontSize: "15px", color: "white", textAlign: "justify", padding: "20px 10px" }}>
        {note.description}

      </div>
      {note.status==='pending'?<div style={{width:'100%',padding:'10px',color:'yellowgreen',fontSize:'15px',fontWeight:'400',display:'flex',justifyContent:'start'}}>Pending</div>:<div style={{width:'100%',padding:'10px',color:'green',fontSize:'15px',fontWeight:'400',display:'flex',justifyContent:'center'}}>Done</div>}
      <div className="member" style={{width:'100%',padding:'10px',color:'yellowgreen',fontSize:'15px',fontWeight:'400',}}>
        <p style={{fontSize:'20px',fontWeight:'400',color:'grey'}}>Members</p>
        {
          note.members.map((e)=>{
            return <p style={{backgroundColor:'white',color:'green',padding:'5px',borderRadius:'5px',fontSize:'15px',margin:'10px 10px'}}>{e}</p>
          })
        }
      </div>
      <div className="button" style={{ width: "100%", display: "flex", justifyContent: "center", padding: "20px 10px" }}>
        <button style={{ padding: "10px", borderRadius: "5px", backgroundColor: "green", color: "black", border: "none", fontSize: "15px",margin:'0px 10px' }} onClick={()=>update(note._id)}>update<i style={{margin:'0px 5px'}} class='bx bx-edit-alt' ></i></button>
        <button style={{ padding: "10px", borderRadius: "5px", backgroundColor: "brown", color: "black", border: "none", fontSize: "15px",margin:'0px 10px' }} onClick={() => deleteitem(note._id)} >delete <i style={{margin:'0px 5px'}} class='bx bxs-trash-alt'></i></button>

      </div>

    </div>
  )
}

export default Noteitem
