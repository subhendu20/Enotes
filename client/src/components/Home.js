import React from 'react'
import Noteitem from './Noteitem'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import './css/Home.css'
import { useNavigate } from 'react-router-dom';
import { members } from '../Lib/Memberlist '
import { default as ReactSelect } from "react-select";
// import { useCallback } from 'react'
import { Select, MenuItem, OutlinedInput, Stack, Chip, FormControl, InputLabel} from '@mui/material';

function Home() {
    
    const navigate = useNavigate()
    const [api, setapi] = useState({ article: [], loading: true })
    const [names,setnames]=useState({names:[]})
    //--------------------------------------fetch name list----------------------------//
    const getnamelist =()=> {

        axios.get('http://localhost:3001/user/getallnames', {
            withCredentials: true

        }).then(async (res) => {
            console.log(res.data)
            setnames({names:res.data})
        }).catch((e) => {
            console.log(e)
            

        })
    }
    
    //--------------------------------------fetch tasks---------------------------------//
    const getapi =()=> {

        axios.get('http://localhost:3001/user/notes/fetchnote', {
            withCredentials: true
        }).then(async (res) => {
            if (res.status === 200) {
                setapi({ article: res.data, loading: false })

            }
            if (res.status === 400) {
                setapi({ article: [], loading: true })

            }
        }).catch((e) => {
            console.log(e)

        })
    }
    useEffect(() => {
        getapi()
        getnamelist()


    }, [])

    if (api.loading === false) {
        console.log(api.article)
    }

    const [data, setdata] = useState({ userid: "", title: "", date: "", description: "",member:[] })
    const change = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })

    }

//------------------------------------------post note------------------------------------------------//
    const submit = async (e) => {
        e.preventDefault()


        const title = data.title
        const date = data.date
        const description = data.description
        const member = data.member
        const dataapi = { title, date, description , member }


        console.log(dataapi)
        axios.post('http://localhost:3001/user/notes/postnote', dataapi, {
            withCredentials: true
        }).then((res) => {
            console.log(res)
            window.location.reload(false);


        }

        ).catch(async (e) => {
            if (e.response.status === 400) {
                await window.alert("You Have to log in to store your note")
                navigate('/login')


            }
        })

    }

    return (
        <div className='App'>
            <div className="content">
                <div className="content-desc">
                    <p>Where great people maintain Harder tasks</p>
                    <a href='/dashboard'>Go to dashboard</a>

                    
                   
                </div>
                <form method="POST" className="form">

                    <span>Title :<input type="text" name='title' placeholder='Title' onChange={change} /></span>
                    <span>Due Date :<input type='date' name="date" placeholder='Date' value="2017-06-01" onChange={change} /></span>
                    <span>Body :<input type='text' name='description' placeholder='Description' onChange={change} /></span>
                    <span> Select members: <FormControl className='span-formcontrol ' fullWidth id="standard-basic" color="primary"
         autoComplete="off" >
                                                            <InputLabel>Select members</InputLabel>
                                                            
                                                            <Select
        multiple
        value={data.member}
        onChange={(e) => setdata({...data,member:e.target.value})}
        input={<OutlinedInput label="Multiple Select" />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {data.member.length!==0 && data.member.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Stack>
        )}
      >
        {names.names.length!==0 && names.names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
                                                            </FormControl>
        </span>
                   
                    <span className='button'><button type='submit' onClick={submit}>Add Note</button></span>
                </form>


            </div>
           { !api.loading && <div className="notes">
                <div className="title"><b>Store your Notes</b> </div>
                
                {
                    !api.loading && <div className="note-items">

                        {
                            api.article.map((e) => {
                                return <Noteitem note={e} key={e._id} />
                            })
                        }




                    </div>
                }



            </div>
}

        </div>
    )
}

export default Home
