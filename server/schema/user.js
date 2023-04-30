const mongoose = require('mongoose')
const user = new mongoose.Schema({
          name:{
                    type:String,
                    required:true
          },
          email:{
                    type:String,
                    required:true,
                    unique:true
          },
          dob:{
                    type:Date,
                    required:true
          },
          mobile:{
                    type:Number,
                    required:true,
                    unique:true
          },
          password:{
                    type:String,
                    required:true,
                    unquie:true
          },
          confirmpassword:{
                    type:String,
                    required:true
          }

})

const userdata = new mongoose.model('user',user)
module.exports=userdata;