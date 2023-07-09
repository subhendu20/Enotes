import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Todo from './Todo'
import './css/Dashboard.css'

function Dashboard() {
          const [api, setapi] = useState({ articles: [], loading: true })
          const[status,setstatus]=useState({pending:0,done:0})
          const getapi =()=> {

                    axios.get('http://localhost:3001/user/notes/fetchnote', {
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

                    axios.get('http://localhost:3001/user/notes/fetchstatus', {
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
                useEffect(() => {
                    getapi()
                    getstatus()
            
            
                }, [])
          
  return (
    <div className="dashboard">

          <div className="to-do">
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

                    </div>
          </div>

    </div>
  )
}

export default Dashboard
