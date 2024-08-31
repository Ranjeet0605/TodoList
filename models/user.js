const mongoose = require("mongoose");
const list = require("./list");
const Usershcema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
  username:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    List:[
       { 
        type: mongoose.Types.ObjectId,
        ref: "List",
      }
    ]
})

module.exports = mongoose.model("user",Usershcema);