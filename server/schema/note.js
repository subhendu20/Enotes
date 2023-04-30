const mongoose = require('mongoose')
const note = new mongoose.Schema({
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
          }
          
})
const notedata = new mongoose.model('notedata',note)
module.exports=notedata;