const express = require('express')
const router = express.Router()
const cors = require('cors')
const user = require('../schema/user')
const auth = require('bcryptjs')
const dotenv = require('dotenv').config()
const JWT = require('jsonwebtoken')
const cookie = require('cookie-parser')
const jwttk = process.env.TOKEN




router.use(cookie())
router.use(cors({
          origin: 'http://localhost:3000',
          methods: ['POST', 'PUT', 'GET','DELETE','OPTIONS', 'HEAD'],
          credentials: true
}))
//----------------------------------------------------end points-------------------------------------------------//

router.post('/signup', async (req, res) => {

          try {
                    const { name, email, dob, mobile, password, confirmpassword } = req.body
                    const salt = await auth.genSaltSync(10)
                    const hashed = await auth.hashSync(password, salt)
                    console.log(hashed)
                    if (password == !confirmpassword) {
                              return res.status(400).send("invalid password")
                    }
                    else {
                              const newuser = await new user({
                                        name, email, dob, mobile, password: hashed, confirmpassword: hashed
                              })

                              newuser.save().then(() => {
                                        res.send(newuser)
                              }).catch((e) => {
                                        console.log(e)
                              })



                    }



          } catch (error) {
                    res.send(error)

          }



})

router.post('/login', async (req, res) => {




          const { mobile, password } = req.body
          const a = await user.findOne({ mobile })




          if (!a) {
                    return res.status(400).send("invalid")
          }
          const passwordcheck = await auth.compare(password, a.password)

          if (!passwordcheck) {
                    res.status(400).send("invalid pasword")
          }

          const cookie = await JWT.sign(a.id, jwttk)


          const cok = await res.cookie("signintoken", cookie, {
                    httpOnly: true


          })


          res.send("done")









})
router.delete('/logout', async (req, res) => {
          const getcookie = await req.cookies.signintoken
          if (!getcookie) {
                    console.log(getcookie)
                    return res.status(400).send("Logged out")
          }

          res.clearCookie('signintoken').send("logout")


})


























module.exports = router;