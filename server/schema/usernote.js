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
const notes = new mongoose.model('note',note)
module.exports=notes;