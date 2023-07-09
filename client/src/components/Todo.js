import React, { useState } from 'react'
import './css/todo.css'
import axios from 'axios'

function Todo({ title, desc, date, status,id }) {
          const [buttonstatus, setbuttonstatus] = useState('pending')


          const day = (d) => {
                    const now = Date.now()
                    const prev = new Date(d)
                    const diffTime = Math.abs(prev - now);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays

          }

          const statusupdate = () => {
                    setbuttonstatus('done')

                    axios.post(`http://localhost:3001/user/notes/updatestatus/${id}`, {
                              withCredentials: true
                    }).then((res) => {
                              console.log(res.data)
                              
                    }

                    ).catch(async (e) => {
                              console.log(e)
                    })


          }

          return (
                    <div className='todo'>
                              <span className="title">{
                                        title
                              }

                              </span>
                              <span className="description">
                                        {desc}

                              </span>
                              <span className="duedate">
                                        {
                                                  day(date)
                                        } Days left

                              </span>
                              <span className="button">
                                        {(status === 'pending' && buttonstatus === 'pending') && <button className='pending' onClick={statusupdate}>Complete</button>
                                        }{((status === 'pending' && buttonstatus !== 'pending') || (status !== 'pending' && buttonstatus === 'pending')) && <button className="done">
                                                  Done
                                        </button>}

                              </span>


                    </div>
          )
}

export default Todo

