import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Todo from './Todo'
import './css/Dashboard.css'

function Dashboard() {
          const [api, setapi] = useState({ articles: [], loading: true })
          const[status,setstatus]=useState({pending:0,done:0})
          const[companions,setcompanions]=useState({namearray:[]})
          const getapi =()=> {

                    axios.get('/user/notes/fetchnote', {
                        withCredentials: true
                    }).then(async (res) => {
                        if (res.status === 200) {
                              console.log(res.data)
                            setapi({ articles: res.data, loading: false })
            
                        }
                        if (res.status === 400) {
                            setapi({ articles: [], loading: true })
            
                        }
                    }).catch((e) => {
                        console.log(e)
            
                    })
                }


                const getstatus =()=> {

                    axios.get('/user/notes/fetchstatus', {
                        withCredentials: true
                    }).then(async (res) => {
                        if (res.status === 200) {
                              console.log(res.data)
                            setstatus({ pending: res.data.pending, done: res.data.done })
            
                        }
                        if (res.status === 400) {
                            setapi({ pending: 0,  done: 0 })
            
                        }
                    }).catch((e) => {
                        console.log(e)
            
                    })
                }
                const getcompanions =()=> {

                    axios.get('/user/notes/fetchcompanion', {
                        withCredentials: true
                    }).then(async (res) => {
                        if (res.status === 200) {
                              console.log(res.data)
                            setcompanions({ namearray:res.data})
            
                        }
                       
                    }).catch((e) => {
                        console.log(e)
            
                    })
                }

                useEffect(() => {
                    getapi()
                    getstatus()
                    getcompanions()
                    
            
            
                }, [])
          
  return (
    <div className="dashboard">

          <div className="to-do">
            <span className="title">
                To-do list
            </span>
          {
                    !api.loading && <div className="note-items-dashboard">

                        {
                            api.articles.map((e) => {

                                return  <Todo title={e.title} desc={e.description} date={e.date} status={e.status} id={e._id} key={e._id} />
                            })
                        }




                    </div>
                }




          </div>
          <div className="updates">
                    <div className="tasks">
                              <span>
                              <i class='bx bxs-user-check'></i>
                              <p  className='count'>Done</p>
                              <p>{status.done}</p>

                              </span>

                              <span>
                              <i class='bx bx-loader-circle'></i>
                              <p className='count'>Pending</p>
                              <p>{status.pending}</p>

                              </span>

                    </div>
                    <div className="categories">
                        <span className="title">Companions</span>
                        {
                            companions.namearray.map((e)=>{
                                return <span className="companion-list">
                                    <p>{e.name}</p><p>{e.occurs} Tasks</p>
                                </span>
                            })
                        }

                    </div>
          </div>

    </div>
  )
}

export default Dashboard
