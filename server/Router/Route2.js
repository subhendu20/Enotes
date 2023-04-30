const express = require('express')
const router = express.Router()
const cors = require('cors')
const user = require('../schema/user')
const note = require('../schema/note')
const auth = require('bcryptjs')
const dotenv = require('dotenv').config()
const JWT = require('jsonwebtoken')
const cookie = require('cookie-parser')
const jwttk = process.env.TOKEN

router.use(cookie())
router.use(cors({
          origin: 'http://localhost:3000',
          methods: ['POST', 'PUT', 'GET','OPTIONS', 'HEAD'],
          credentials: true
}))

// --------------------------------------------------------end points-----------------------------------------------------//


// ---------------------------------post note--------------------------------//
router.post('/postnote', async (req, res) => {
          try {
                    const { title, description, date } = req.body
                    const getcookie = await req.cookies.signintoken

                    if (!getcookie) {
                              return res.status(400).send("you have too logged in first")
                    }
                    const check = await JWT.verify(getcookie, jwttk)
                    if (!check) {
                              return res.send("you are logged out")
                    }


                    const newnote = new note({
                              userid: check, title, description, date
                    })
                    newnote.save().then(() => {
                              console.log(newnote)
                              res.send(newnote)
                              
                    }).catch((e) => {
                              console.log(e)
                    })



          } catch (error) {
                    res.send(error)

          }
          // note.create(req.body).then(()=>{
          //           res.send("done")

          // }).catch(((e)=>{
          //           console.log(e)
          // }))

})
// ----------------------------------fetch note-------------------------------//
router.get('/fetchnote', async (req, res) => {
          try {
                    const getcookie = await req.cookies.signintoken
                    if (!getcookie) {
                              return res.status(400).send([{}])
                    }
                    const check = await JWT.verify(getcookie, jwttk)
                    if (!check) {
                              return res.send("you are logged out")
                    }
                    const data = await note.find({ userid: check })
                    res.status(200).send(data)

          } catch (error) {
                    res.send(error)

          }
          // const data = await note.find({})
          // res.send(data)




})
// --------------------------------update note-------------------------------//
router.put('/update/:id', async (req, res) => {
          try {
                    const { title, description, date } = req.body
                    const getcookie = await req.cookies.signintoken
                    if (!getcookie) {
                              return res.status(400).send("logged out")
                    }
                    const check = await JWT.verify(getcookie, jwttk)
                    if (!check) {
                              return res.send("you are logged out")
                    }
                    const find = await note.findById(req.params.id)
                    find.title = title
                    find.date=date
                    find.description= description
                    

                    find.save().then(() => {
                              res.send(find)
                    }).catch((e) => {
                              console.log(e)
                    })

                    
          } catch (error) {
                    console.log(error)
          }
})
//----------------------------------delete note------------------------------//

router.post('/delete/:id',async (req, res) => {
          try {
                    // const getcookie = await req.cookies.signintoken
                    // if (!getcookie) {
                    //           return res.send("you have too logged in first")
                    // }
                    // const check = await JWT.verify(getcookie, jwttk)
                    // if (!check) {
                    //           return res.send("invalid request")
                    // }
                    const del = await note.findByIdAndDelete(req.params.id)
                    const data = await note.find({})
                    console.log(del)
                    res.send(data)


          } catch (e) {
                    console.log("naaa")
          }
})









module.exports = router


