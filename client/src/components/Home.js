import React from 'react'
import Noteitem from './Noteitem'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import './css/Home.css'
import { useNavigate } from 'react-router-dom';
// import { useCallback } from 'react'

function Home() {
    const navigate = useNavigate()
    const [api, setapi] = useState({ article: [], loading: true })
    const [component, setcomponent] = useState({ readbtn: "Read more", slice: 200, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laboriosam a, nobis expedita ab dicta, vero tempora tenetur ipsum nulla iusto ut pariatur dolorum facilis corporis quasi reiciendis aperiam! Error maiores commodi tenetur acxhias sabisab sab cxb as cas cx ascxsa csab c sac sa c sac sa csa c sc sa c jv dncow  nwncv nowljwiofwjofjwoiejojeioj weijfiojweo owijfdcwje wejdfijew woejfdijwe owjfdci!" })
    const expand = () => {
        if (component.readbtn === "Read more") {
            setcomponent({
                readbtn: "Read less",
                slice: 400,
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laboriosam a, nobis expedita ab dicta, vero tempora tenetur ipsum nulla iusto ut pariatur dolorum facilis corporis quasi reiciendis aperiam! Error maiores commodi tenetur!acxhias sabisab sab cxb as cas cx ascxsa csab c sac sa c sac sa csa c sc sa c jv dncow  nwncv nowljwiofwjofjwoiejojeioj weijfiojweo owijfdcwje wejdfijew woejfdijwe owjfdci!"
            })
        }
        else {
            setcomponent({
                readbtn: "Read more",
                slice: 200,
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laboriosam a, nobis expedita ab dicta, vero tempora tenetur ipsum nulla iusto ut pariatur dolorum facilis corporis quasi reiciendis aperiam! Error maiores commodi tenetur! acxhias sabisab sab cxb as cas cx ascxsa csab c sac sa c sac sa csa c sc sa c jv dncow  nwncv nowljwiofwjofjwoiejojeioj weijfiojweo owijfdcwje wejdfijew woejfdijwe owjfdci!"
            })

        }

    }
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


    }, [])

    if (api.loading === false) {
        console.log(api.article)
    }

    const [data, setdata] = useState({ userid: "", title: "", date: "", description: "" })
    const change = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })

    }


    const submit = async (e) => {
        e.preventDefault()


        const title = data.title
        const date = data.date
        const description = data.description
        const dataapi = { title, date, description }


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
                    <p>Make your Own Note</p>
                    <p className="desc">{component.text.slice(0, component.slice)}</p>
                    <span><button className="btn" onClick={expand}>{component.readbtn}</button></span>
                </div>
                <form method="POST" className="form">

                    <span>Title :<input type="text" name='title' placeholder='Title' onChange={change} /></span>
                    <span>date :<input type='date' name="date" placeholder='Date' onChange={change} /></span>
                    <span>Description :<input type='text' name='description' placeholder='Description' onChange={change} /></span>
                    <span className='button'><button type='submit' onClick={submit}>Add Note</button></span>
                </form>


            </div>
           { !api.loading && <div className="notes">
                <div className="title"><b>Read and Write your Notes</b> </div>
                
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
