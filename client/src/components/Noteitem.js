import React, { useState } from 'react'
import './Noteitems.css'
import axios from 'axios'
import './css/Note.css'




// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


// import { useEffect } from 'react'

function Noteitem(props) {
  

  const[updatevisiblity,setupdatevisiblity]=useState(false)
  const[formdata,setformdata]=useState({title:"",date:"",description:""})
  const[noteid,setnoteid]=useState(null)
  


  const { note } = props
  // const[load,setload]=useState({loadcount:0})

  const navigate = useNavigate()




  const deleteitem = async (id) => {
    console.log(id)



    axios.post(`http://localhost:3001/user/notes/delete/${id}`, {
      withCredentials: true
    }).then((res) => {
      // setload({loadcount:load.loadcount+1})
      // window.location.reload(false);
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


  // const delete=(id)=>{
  //   console.log("ok")
  //   axios.post(`http://localhost:3001/user/notes/delete/${id}`,{
  //     withCredentials: true
  // }).then((res)=>{
  //   console.log(res.data)

  //   navigate('/')
  // }).catch((e)=>{
  //   console.log(e)
  //   window.alert("error in delete item")
  // })

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
      <div className="date" style={{ width: "100%", padding: "20px 10px" }} >
        {note.date}

      </div>
      <div className="decription" style={{ width: "100%", fontSize: "15px", color: "white", textAlign: "justify", padding: "20px 10px" }}>
        {note.description}

      </div>
      <div className="button" style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "20px 10px" }}>
        <button style={{ padding: "10px", borderRadius: "2px", backgroundColor: "black", color: "white", border: "none", fontSize: "15px" }} onClick={()=>update(note._id)}>update</button>
        <button style={{ padding: "10px", borderRadius: "2px", backgroundColor: "black", color: "white", border: "none", fontSize: "15px" }} onClick={() => deleteitem(note._id)} >delete</button>

      </div>

    </div>
  )
}

export default Noteitem
