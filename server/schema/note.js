const mongoose = require('mongoose')
const task = new mongoose.Schema({
          userid:{
                    type:String,
                    required:true,
                    
          },
          title:{
                    type:String,
                    required:true,
                    
          },
          description:{
                    type:String,
                    required:true
          },
          date:{
                    type:Date,
                    required:true
          },
          status:{
                    type:String,
                    required:true
          }
          ,
          members:{
                    type: Array, 
                    required: true 
                    
          }
})
const notedata = new mongoose.model('taskt',task)
module.exports=notedata;